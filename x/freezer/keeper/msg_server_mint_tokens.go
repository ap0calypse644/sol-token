package keeper

import (
	"context"
	"errors"

	"solt/x/freezer/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) MintTokens(goCtx context.Context, msg *types.MsgMintTokens) (*types.MsgMintTokensResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	issuer, _ := sdk.AccAddressFromBech32(msg.Creator)

	exists, tokenDetails := k.DenomAlreadyRegistered(ctx, msg.Amount[0].Denom)
	if !exists {
		err := k.bankKeeper.MintCoins(ctx, types.ModuleName, msg.Amount)
		if err != nil {
			return nil, err
		}

		err = k.bankKeeper.SendCoinsFromModuleToAccount(ctx, types.ModuleName, issuer, msg.Amount)
		if err != nil {
			return nil, err
		}

		var token types.Tlist
		token.Creator = msg.Creator
		token.Denom = msg.Amount[0].Denom

		store := ctx.KVStore(k.storeKey)

		key := types.TokenKeyPrefix
		key = append(key, []byte(token.Denom)...)
		b := k.cdc.MustMarshal(&token)

		store.Set(key, b)
	} else {
		if tokenDetails.Creator == msg.Creator {
			err := k.bankKeeper.MintCoins(ctx, types.ModuleName, msg.Amount)
			if err != nil {
				return nil, err
			}

			err = k.bankKeeper.SendCoinsFromModuleToAccount(ctx, types.ModuleName, issuer, msg.Amount)
			if err != nil {
				return nil, err
			}
		} else {
			return nil, errors.New("denom already registered. try a different Denom")
		}
	}

	return &types.MsgMintTokensResponse{}, nil
}
