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

func (k Keeper) GetFrozenAssets(ctx sdk.Context, owner sdk.AccAddress) (bool, types.Flist) {
	var frozenAssets types.Flist

	store := ctx.KVStore(k.storeKey)
	key := types.FreezeKeyPrefix
	key = append(key, owner.Bytes()...)

	if !store.Has(key) {
		return false, frozenAssets
	}

	b := store.Get(key)
	k.cdc.MustUnmarshal(b, &frozenAssets)

	return true, frozenAssets
}

func (k Keeper) SetFrozenAssets(ctx sdk.Context, owner sdk.AccAddress, frozenAssets types.Flist) {
	store := ctx.KVStore(k.storeKey)
	key := types.FreezeKeyPrefix
	key = append(key, owner.Bytes()...)

	b := k.cdc.MustMarshal(&frozenAssets)
	store.Set(key, b)
}
