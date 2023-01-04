package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"solt/x/freezer/types"
)

func (k msgServer) MintTokens(goCtx context.Context, msg *types.MsgMintTokens) (*types.MsgMintTokensResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Handling the message
	_ = ctx

	return &types.MsgMintTokensResponse{}, nil
}
