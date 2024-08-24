module nfts::random_nft_airdrop {
    use std::string;
    use sui::object::delete;
    use sui::random;
    use sui::random::{Random, new_generator};


    const EInvalidParams: u64 = 0;

    const GOLD: u8 = 1;
    const SILVER: u8 = 2;
    const BRONZE: u8 = 3;
//盲盒NFT的结构
    public struct AirDropNFT has key, store {
        id: UID,
    }

//金属NFT的结构
    public struct MetalNFT has key, store {
        id: UID,
        metal: u8,

    }

//盲盒NFT铸造权限结构
    public struct MintingCapability has key {
        id: UID,
    }

//创建MintingCapability转发给合约发布者，该Capability具备空投盲盒NFT的铸造权限
    #[allow(unused_function)]
    fun init(ctx: &mut TxContext) {
        transfer::transfer(
            MintingCapability { id: object::new(ctx) },
            tx_context::sender(ctx),
        );
    }

//铸造空投盲盒NFT，直接空投NFT给用户
    entry fun mint_to_address(_cap: &MintingCapability, addresses: vector<address>, ctx: &mut TxContext) {
        let size = addresses.length();
        let mut i = 0;
        while (i < size) {
            transfer::public_transfer(AirDropNFT { id: object::new(ctx) }, addresses[i]);
            i = i + 1;
        };
    }
//开盲盒方式一：条件判断开盲盒

    entry fun reveal(nft: AirDropNFT, r: &Random, ctx: &mut TxContext) {
        destroy_airdrop_nft(nft);

        let mut generator = new_generator(r, ctx);
        let v = random::generate_u8_in_range(&mut generator, 1, 100);

        let is_gold = arithmetic_is_less_than(v, 11, 100); // probability of 10%
        let is_silver = arithmetic_is_less_than(v, 41, 100) * (1 - is_gold); // probability of 30%
        let is_bronze = (1 - is_gold) * (1 - is_silver); // probability of 60%
        let metal = is_gold * GOLD + is_silver * SILVER + is_bronze * BRONZE;

        transfer::public_transfer(
            MetalNFT { id: object::new(ctx), metal, },
            tx_context::sender(ctx)
        );
    }

    fun arithmetic_is_less_than(v: u8, w: u8, v_max: u8): u8 {
        assert!(v_max >= w && w > 0, EInvalidParams);
        let v_max_over_w = v_max / w;
        let v_over_w = v / w; // 0 if v < w, [1, v_max_over_w] if above
        (v_max_over_w - v_over_w) / v_max_over_w
    }

    fun destroy_airdrop_nft(nft: AirDropNFT) {
        let AirDropNFT { id } = nft;
        object::delete(id)
    }

    public fun metal_string(nft: &MetalNFT): string::String {
        if (nft.metal == GOLD) string::utf8(b"Gold")
        else if (nft.metal == SILVER) string::utf8(b"Silver")
        else string::utf8(b"Bronze")
    }
}