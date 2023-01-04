/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Coin } from "../../cosmos/base/v1beta1/coin";

export const protobufPackage = "solt.freezer";

export interface MsgMintTokens {
  creator: string;
  amount: Coin[];
}

export interface MsgMintTokensResponse {
}

export interface MsgFreezeTokens {
  creator: string;
  owner: string;
  amount: Coin[];
}

export interface MsgFreezeTokensResponse {
}

export interface MsgUnfreezeTokens {
  creator: string;
  owner: string;
  amount: Coin[];
}

export interface MsgUnfreezeTokensResponse {
}

function createBaseMsgMintTokens(): MsgMintTokens {
  return { creator: "", amount: [] };
}

export const MsgMintTokens = {
  encode(message: MsgMintTokens, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    for (const v of message.amount) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgMintTokens {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgMintTokens();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.amount.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgMintTokens {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      amount: Array.isArray(object?.amount) ? object.amount.map((e: any) => Coin.fromJSON(e)) : [],
    };
  },

  toJSON(message: MsgMintTokens): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    if (message.amount) {
      obj.amount = message.amount.map((e) => e ? Coin.toJSON(e) : undefined);
    } else {
      obj.amount = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgMintTokens>, I>>(object: I): MsgMintTokens {
    const message = createBaseMsgMintTokens();
    message.creator = object.creator ?? "";
    message.amount = object.amount?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMsgMintTokensResponse(): MsgMintTokensResponse {
  return {};
}

export const MsgMintTokensResponse = {
  encode(_: MsgMintTokensResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgMintTokensResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgMintTokensResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgMintTokensResponse {
    return {};
  },

  toJSON(_: MsgMintTokensResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgMintTokensResponse>, I>>(_: I): MsgMintTokensResponse {
    const message = createBaseMsgMintTokensResponse();
    return message;
  },
};

function createBaseMsgFreezeTokens(): MsgFreezeTokens {
  return { creator: "", owner: "", amount: [] };
}

export const MsgFreezeTokens = {
  encode(message: MsgFreezeTokens, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.owner !== "") {
      writer.uint32(18).string(message.owner);
    }
    for (const v of message.amount) {
      Coin.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgFreezeTokens {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgFreezeTokens();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.owner = reader.string();
          break;
        case 3:
          message.amount.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgFreezeTokens {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      owner: isSet(object.owner) ? String(object.owner) : "",
      amount: Array.isArray(object?.amount) ? object.amount.map((e: any) => Coin.fromJSON(e)) : [],
    };
  },

  toJSON(message: MsgFreezeTokens): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.owner !== undefined && (obj.owner = message.owner);
    if (message.amount) {
      obj.amount = message.amount.map((e) => e ? Coin.toJSON(e) : undefined);
    } else {
      obj.amount = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgFreezeTokens>, I>>(object: I): MsgFreezeTokens {
    const message = createBaseMsgFreezeTokens();
    message.creator = object.creator ?? "";
    message.owner = object.owner ?? "";
    message.amount = object.amount?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMsgFreezeTokensResponse(): MsgFreezeTokensResponse {
  return {};
}

export const MsgFreezeTokensResponse = {
  encode(_: MsgFreezeTokensResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgFreezeTokensResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgFreezeTokensResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgFreezeTokensResponse {
    return {};
  },

  toJSON(_: MsgFreezeTokensResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgFreezeTokensResponse>, I>>(_: I): MsgFreezeTokensResponse {
    const message = createBaseMsgFreezeTokensResponse();
    return message;
  },
};

function createBaseMsgUnfreezeTokens(): MsgUnfreezeTokens {
  return { creator: "", owner: "", amount: [] };
}

export const MsgUnfreezeTokens = {
  encode(message: MsgUnfreezeTokens, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.owner !== "") {
      writer.uint32(18).string(message.owner);
    }
    for (const v of message.amount) {
      Coin.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUnfreezeTokens {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUnfreezeTokens();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.owner = reader.string();
          break;
        case 3:
          message.amount.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUnfreezeTokens {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      owner: isSet(object.owner) ? String(object.owner) : "",
      amount: Array.isArray(object?.amount) ? object.amount.map((e: any) => Coin.fromJSON(e)) : [],
    };
  },

  toJSON(message: MsgUnfreezeTokens): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.owner !== undefined && (obj.owner = message.owner);
    if (message.amount) {
      obj.amount = message.amount.map((e) => e ? Coin.toJSON(e) : undefined);
    } else {
      obj.amount = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUnfreezeTokens>, I>>(object: I): MsgUnfreezeTokens {
    const message = createBaseMsgUnfreezeTokens();
    message.creator = object.creator ?? "";
    message.owner = object.owner ?? "";
    message.amount = object.amount?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMsgUnfreezeTokensResponse(): MsgUnfreezeTokensResponse {
  return {};
}

export const MsgUnfreezeTokensResponse = {
  encode(_: MsgUnfreezeTokensResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUnfreezeTokensResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUnfreezeTokensResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgUnfreezeTokensResponse {
    return {};
  },

  toJSON(_: MsgUnfreezeTokensResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUnfreezeTokensResponse>, I>>(_: I): MsgUnfreezeTokensResponse {
    const message = createBaseMsgUnfreezeTokensResponse();
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  MintTokens(request: MsgMintTokens): Promise<MsgMintTokensResponse>;
  FreezeTokens(request: MsgFreezeTokens): Promise<MsgFreezeTokensResponse>;
  /** this line is used by starport scaffolding # proto/tx/rpc */
  UnfreezeTokens(request: MsgUnfreezeTokens): Promise<MsgUnfreezeTokensResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.MintTokens = this.MintTokens.bind(this);
    this.FreezeTokens = this.FreezeTokens.bind(this);
    this.UnfreezeTokens = this.UnfreezeTokens.bind(this);
  }
  MintTokens(request: MsgMintTokens): Promise<MsgMintTokensResponse> {
    const data = MsgMintTokens.encode(request).finish();
    const promise = this.rpc.request("solt.freezer.Msg", "MintTokens", data);
    return promise.then((data) => MsgMintTokensResponse.decode(new _m0.Reader(data)));
  }

  FreezeTokens(request: MsgFreezeTokens): Promise<MsgFreezeTokensResponse> {
    const data = MsgFreezeTokens.encode(request).finish();
    const promise = this.rpc.request("solt.freezer.Msg", "FreezeTokens", data);
    return promise.then((data) => MsgFreezeTokensResponse.decode(new _m0.Reader(data)));
  }

  UnfreezeTokens(request: MsgUnfreezeTokens): Promise<MsgUnfreezeTokensResponse> {
    const data = MsgUnfreezeTokens.encode(request).finish();
    const promise = this.rpc.request("solt.freezer.Msg", "UnfreezeTokens", data);
    return promise.then((data) => MsgUnfreezeTokensResponse.decode(new _m0.Reader(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
