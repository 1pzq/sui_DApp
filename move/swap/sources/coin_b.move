// module new_swap::coin_b {
//     use std::option;
//     use sui::coin::{Self, Coin, TreasuryCap};
//     use sui::transfer;
//     use sui::tx_context::{Self, TxContext};

//     struct COIN_B has drop {}

//     fun init(witness: COIN_B, ctx: &mut TxContext) {
//         let (treasury_cap, metadata) = coin::create_currency<COIN_B>(
//             witness,
//             3,
//             b"COIN_B",
//             b"CB",
//             b"learning for swap",
//             option::none(),
//             ctx
//         );

//         transfer::public_freeze_object(metadata);
//         transfer::public_transfer(treasury_cap, tx_context::sender(ctx));
//     }

//     public fun mint(
//         treasury_cap: &mut TreasuryCap<COIN_B>,
//         amount: u64,
//         recipient: address,
//         ctx: &mut TxContext
//     ) {
//         coin::mint_and_transfer(treasury_cap, amount, recipient, ctx);
//     }

//     public fun burn(treasury_cap: &mut TreasuryCap<COIN_B>, coin: Coin<COIN_B>) {
//         coin::burn(treasury_cap, coin);
//     }

//     #[test_only]
//     public fun test_init(ctx: &mut TxContext) {
//         init(COIN_B {}, ctx);
//     }
// }
// /*0x55d0fdaeb8bfe79285034f7bc61ea3f69b6056d3620cd155bfb84816aebfdfd4*/
module new_swap::coin_b {
    use std::option;
    use sui::coin::{Self, Coin, TreasuryCap};
    use sui::transfer;
    use sui::tx_context::{TxContext};

     struct COIN_B has drop {}
#[allow(lint(share_owned))]
    fun init(witness: COIN_B, ctx: &mut TxContext) {
        let (treasury_cap, metadata) = coin::create_currency<COIN_B>(
            witness,
            3,
            b"COIN_B",
            b"CB",
            b"lSwap Coin_B",
            option::none(),
            ctx
        );

        transfer::public_freeze_object(metadata);
        transfer::public_share_object(treasury_cap);
    }

    public fun mint(
        treasury_cap: &mut TreasuryCap<COIN_B>,
        amount: u64,
        recipient: address,
        ctx: &mut TxContext
    ) {
        coin::mint_and_transfer(treasury_cap, amount, recipient, ctx);
    }

    public fun burn(treasury_cap: &mut TreasuryCap<COIN_B>, coin: Coin<COIN_B>) {
        coin::burn(treasury_cap, coin);
    }
}
