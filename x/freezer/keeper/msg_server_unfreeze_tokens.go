package keeper

import (
	"context"
	"errors"

	"solt/x/freezer/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) UnfreezeTokens(goCtx context.Context, msg *types.MsgUnfreezeTokens) (*types.MsgUnfreezeTokensResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	owner, _ := sdk.AccAddressFromBech32(msg.Owner)
	denom := msg.Amount[0].Denom

	var freezeList types.Flist

	exists, frozenAssets := k.GetFrozenAssets(ctx, owner)

	if !exists {
		return nil, errors.New("account does not have frozen tokens")
	}

	frozenTokens := sdk.NewCoins(frozenAssets.Amount...)
	if frozenTokens.AmountOf(denom).LT(msg.Amount[0].Amount) {
		return nil, errors.New("account does not have enough frozen tokens")
	}

	// Check if issuer is trying to unfreeze tokens
	if frozenAssets.Issuer != msg.Creator {
		return nil, errors.New("only issuer is authorized to unfreeze tokens")
	}

	freezeList.Owner = msg.Owner
	freezeList.Issuer = msg.Creator
	freezeList.Amount = frozenTokens.Sub(msg.Amount[0])

	k.SetFrozenAssets(ctx, owner, freezeList)

	return &types.MsgUnfreezeTokensResponse{}, nil
}
