const VERSION = "1.21.4"
const MCMETA = `https://raw.githubusercontent.com/misode/mcmeta/refs/tags`
const exclude = ["spawn_egg", "command_block", "jigsaw_block","structure","minecraft:light","potion","barrier","bedrock","minecraft:air"]

async function generateLootTableOfAllItems(excludeKeywords) {
    const items = (await (await fetch(`${MCMETA}/${VERSION}-registries/item/data.json`)).json()).filter(itemName => {
        return !excludeKeywords.some(keyword => itemName.includes(keyword));
    });
    
    const loot_table = {
        pools: [
            {
                rolls: 1,
                entries: []
            }
        ]
    };

    for (const item of items) {
        loot_table.pools[0].entries.push({
            type: "minecraft:item",
            name: item,
        });
    }
    
    return loot_table;
}

async function main() {
    const lootTable = await generateLootTableOfAllItems(exclude);
    await Deno.writeFile("./pof_loot_table.json", new TextEncoder().encode(JSON.stringify(lootTable, null, 2)))
    console.log();
}

main()
