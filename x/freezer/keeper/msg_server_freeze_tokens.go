package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"solt/x/freezer/types"
)

func (k msgServer) FreezeTokens(goCtx context.Context, msg *types.MsgFreezeTokens) (*types.MsgFreezeTokensResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Handling the message
	_ = ctx

	return &types.MsgFreezeTokensResponse{}, nil
}
