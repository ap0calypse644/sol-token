package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgUnfreezeTokens = "unfreeze_tokens"

var _ sdk.Msg = &MsgUnfreezeTokens{}

func NewMsgUnfreezeTokens(creator string, owner string, amount sdk.Coins) *MsgUnfreezeTokens {
	return &MsgUnfreezeTokens{
		Creator: creator,
		Owner:   owner,
		Amount:  amount,
	}
}

func (msg *MsgUnfreezeTokens) Route() string {
	return RouterKey
}

func (msg *MsgUnfreezeTokens) Type() string {
	return TypeMsgUnfreezeTokens
}

func (msg *MsgUnfreezeTokens) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgUnfreezeTokens) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgUnfreezeTokens) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
