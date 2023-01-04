package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgFreezeTokens = "freeze_tokens"

var _ sdk.Msg = &MsgFreezeTokens{}

func NewMsgFreezeTokens(creator string, owner string, amount sdk.Coins) *MsgFreezeTokens {
	return &MsgFreezeTokens{
		Creator: creator,
		Owner:   owner,
		Amount:  amount,
	}
}

func (msg *MsgFreezeTokens) Route() string {
	return RouterKey
}

func (msg *MsgFreezeTokens) Type() string {
	return TypeMsgFreezeTokens
}

func (msg *MsgFreezeTokens) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgFreezeTokens) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgFreezeTokens) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
