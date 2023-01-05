package keeper

import (
	"context"
	"errors"

	"solt/x/freezer/types"

	solbanktypes "solt/x/bank/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) FreezeTokens(goCtx context.Context, msg *types.MsgFreezeTokens) (*types.MsgFreezeTokensResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	owner, _ := sdk.AccAddressFromBech32(msg.Owner)
	denom := msg.Amount[0].Denom
	var freezeList solbanktypes.Flist

	balance := k.bankKeeper.SpendableCoins(ctx, owner)
	// Check if account has tokens to freeze
	if balance.AmountOf(denom) == sdk.ZeroInt() {
		return nil, errors.New("account does not own token")
	}

	exists, frozenAssets := k.bankKeeper.GetFrozenAssets(ctx, owner)

	// Check if acount has previously frozen assets
	if !exists {
		if balance.AmountOf(denom).LT(msg.Amount[0].Amount) {
			return nil, errors.New("account does not have enough tokens to freeze")
		}
	}

	frozenTokens := sdk.NewCoins(frozenAssets.Amount...)
	// Check if account has enough tokens to freeze
	if balance.AmountOf(denom).Sub(frozenTokens.AmountOf(denom)).LT(msg.Amount[0].Amount) {
		return nil, errors.New("account does not have enough tokens to freeze")
	}

	// Check if issuer is trying to freeze tokens
	if frozenAssets.Issuer != msg.Creator {
		return nil, errors.New("only issuer is authorized to freeze tokens")
	}

	// freeze tokens

	freezeList.Amount = frozenTokens.Add(msg.Amount[0])
	freezeList.Issuer = msg.Creator
	freezeList.Owner = msg.Owner

	k.bankKeeper.SetFrozenAssets(ctx, owner, freezeList)

	return &types.MsgFreezeTokensResponse{}, nil
}
