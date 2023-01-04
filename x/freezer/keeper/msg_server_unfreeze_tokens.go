package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"solt/x/freezer/types"
)

func (k msgServer) UnfreezeTokens(goCtx context.Context, msg *types.MsgUnfreezeTokens) (*types.MsgUnfreezeTokensResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Handling the message
	_ = ctx

	return &types.MsgUnfreezeTokensResponse{}, nil
}
