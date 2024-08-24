module new_swap::coin_a {
    use std::option;
    use sui::coin::{Self, Coin, TreasuryCap};
    use sui::transfer;
    use sui::tx_context::{TxContext};

     struct COIN_A has drop {}
#[allow(lint(share_owned))]
    fun init(witness: COIN_A, ctx: &mut TxContext) {
        let (treasury_cap, metadata) = coin::create_currency<COIN_A>(
            witness,
            3,
            b"COIN_A",
            b"CA",
            b"Swap Coin_A",
            option::none(),
            ctx
        );

        transfer::public_freeze_object(metadata);
        transfer::public_share_object(treasury_cap);
    }

    public fun mint(
        treasury_cap: &mut TreasuryCap<COIN_A>,
        amount: u64,
        recipient: address,
        ctx: &mut TxContext
    ) {
        coin::mint_and_transfer(treasury_cap, amount, recipient, ctx);
    }

    public fun burn(treasury_cap: &mut TreasuryCap<COIN_A>, coin: Coin<COIN_A>) {
        coin::burn(treasury_cap, coin);
    }
}
/*
packageID 0x3cfb2825b62c1ab9bf5235bdebf8bb0ed85c4135480bb5e6c5476a4ff7e524fc
Coin_A 的 TreasuryCap ID 0x1f72643960fecc01ea26024418c320fea328c6e6fae774f6a6b472cb3add0bdc

Coin_B 的 TreasuryCap ID 0x9edfcc9f1ded6af98d18febb4d0e415ff532e63ba9fce8cfcf1de3a786bf5456
COIN_A_1=0x9bd71f5b2899c4ef77f4cf290f45c4aafc68e068a26b523498f3532eaa7137da
COIN_B_1=0x7a55bab3125abb062178e5f0dcab0599924855dece510304656c3dd2eece16fd
Pool ID = 0xf8ca1adec4960694f9515bcfcc6baecc18adbbe270a5f0d7e0cc3909c1b29db0
export LSP_ID_1=0x18d514c395480a178a3cbd28de6f45542f2c66632106bf16dbdcde72c0181077
*/