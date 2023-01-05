package keeper

import (
	"solt/x/freezer/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k Keeper) DenomAlreadyRegistered(ctx sdk.Context, denom string) (bool, types.Tlist) {
	var token types.Tlist

	store := ctx.KVStore(k.storeKey)

	key := types.TokenKeyPrefix
	key = append(key, []byte(denom)...)

	if !store.Has(key) {
		return false, token
	}

	b := store.Get(key)
	k.cdc.MustUnmarshal(b, &token)

	return true, token
}