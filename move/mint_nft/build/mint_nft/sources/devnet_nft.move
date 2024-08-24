module mint_nft::devnet_nft {
    use sui::url::{Self, Url};
    use std::string;
    use std::ascii;
    use sui::event;

  
    public struct DevNetNFT has key, store {
        id: UID,
        name: string::String,
        description: string::String,
        url: Url,
    }

    public struct MintNFTEvent has copy, drop {
        object_id: ID,
        creator: address,
        name: string::String,
    }

   
    public entry fun mint(
        name: string::String,
        description: string::String,
        url: ascii::String,
        ctx: &mut TxContext
    ) {
        let nft = DevNetNFT {
            id: object::new(ctx),
            name,
            description,
            url: url::new_unsafe(url),
        };
        let sender = tx_context::sender(ctx);
        event::emit(MintNFTEvent {
            object_id: object::uid_to_inner(&nft.id),
            creator: sender,
            name: nft.name,
        });
        transfer::public_transfer(nft, sender);
    }
    // 0x76b0a7cf1f86ac8a7aa0e5287259eab0a485d9a56c4880d521d7e503c6933d0f 
}
