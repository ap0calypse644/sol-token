# solt

**solt** is a blockchain built using Cosmos SDK and Tendermint and created with [Ignite CLI](https://ignite.com/cli).

## Working Principle

The application customizes the default `bank` module and introduces the `freezer` module. The `freezer` module allows users to mint new tokens of different denominations and to freeze and unfreeze the issued tokens in any account holding these tokens. The customized `bank` module prevents the transfer of frozen tokens.

---

## Minting Tokens

New tokens can be minted by any user, subject to the following conditions:

1. User can mint new tokens of a previously unregistered denomination
2. User can mint tokens of previously registered denomination IFF the user registered the denomination. For example, if Alice registers and mints tokens of denomination `Denom1`, only Alice will be allowed to mint more tokens of `Denom1` in the future.
3. User cannot mint tokens of denomination registered by a different user. That is, Bob cannot mint tokens of `Denom1`.

When tokens of a previously unregistered denomination is minted by a user, the denomination is automatically registered to the user.

User can mint new tokens using the following transaction:

```shell
soltd tx freezer mint-tokens [amount] [flags]
```

### Mint Tokens Example

```shell
soltd tx freezer mint-tokens 1000denom1 --from alice
```

---

## Freeze Tokens

A user can freeze tokens in any account, subject to the following conditions:

1. The denomination being frozen must be registered to the user. For example, if Alice mints tokens of `Denom1`, only Alice reserves the right to freeze these tokens. Bob does not have the authority to freeze tokens of denom `Denom1`.
2. The account in which user is trying to freeze the tokens, must have sufficient unfrozen tokens.

User can freeze tokens of a particular account using the following transaction:

```shell
soltd tx freezer freeze-tokens [owner] [amount] [flags]
```

Where, `owner` is the account on which tokens are being frozen and `amount` is the amount of tokens being frozen.

### Freeze Tokens Example

```shell
soltd tx freezer freeze-tokens cosmos1hc89ptup6k30lkkfwjdzs57zuul0sneukmv3af 100denom1 --from alice
```

---

## Unfreeze Tokens

A user can unfreeze tokens in any account, subject to the following conditions:

1. The denomination being unfrozen must be registered to the user. For example, if Alice mints tokens of `Denom1`, only Alice reserves the right to unfreeze these tokens. Bob does not have the authority to unfreeze tokens of denom `Denom1`.
2. The account in which user is trying to unfreeze the tokens, must have sufficient frozen tokens.

User can unfreeze tokens of a particular account using the following transaction:

```shell
soltd tx freezer unfreeze-tokens [owner] [amount] [flags]
```

Where, `owner` is the account on which tokens are being unfrozen and `amount` is the amount of tokens being unfrozen.

### Unfreeze Tokens Example

```shell
soltd tx freezer unfreeze-tokens cosmos1hc89ptup6k30lkkfwjdzs57zuul0sneukmv3af 100denom1 --from alice
```

---

## Sending Tokens

A user can send tokens to other accounts, subject to the following conditions:

1. The amount of tokens being transferred must be unfrozen.

The transaction to make a transfer is the same as the default bank send transaction:

```shell
soltd tx bank send [from_key_or_address] [to_address] [amount] [flags]
```
