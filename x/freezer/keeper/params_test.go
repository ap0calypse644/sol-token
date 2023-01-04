package keeper_test

import (
	"testing"

	"github.com/stretchr/testify/require"
	testkeeper "solt/testutil/keeper"
	"solt/x/freezer/types"
)

func TestGetParams(t *testing.T) {
	k, ctx := testkeeper.FreezerKeeper(t)
	params := types.DefaultParams()

	k.SetParams(ctx, params)

	require.EqualValues(t, params, k.GetParams(ctx))
	require.EqualValues(t, params.MaxIssueLimit, k.MaxIssueLimit(ctx))
}
