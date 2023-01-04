package keeper

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	"solt/x/freezer/types"
)

// GetParams get all parameters as types.Params
func (k Keeper) GetParams(ctx sdk.Context) types.Params {
	return types.NewParams(
		k.MaxIssueLimit(ctx),
	)
}

// SetParams set the params
func (k Keeper) SetParams(ctx sdk.Context, params types.Params) {
	k.paramstore.SetParamSet(ctx, &params)
}

// MaxIssueLimit returns the MaxIssueLimit param
func (k Keeper) MaxIssueLimit(ctx sdk.Context) (res uint64) {
	k.paramstore.Get(ctx, types.KeyMaxIssueLimit, &res)
	return
}
