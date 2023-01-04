package keeper

import (
	"solt/x/freezer/types"
)

var _ types.QueryServer = Keeper{}
