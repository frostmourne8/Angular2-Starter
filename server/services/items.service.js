"use strict";

const fs = require('fs');
const path = require('path');
const request = require('request-promise');
const Promise = require("bluebird");

const dataPath = path.resolve(__dirname, '..', 'data');

const BASE_API_URL = 'https://us.api.battle.net/wow/item/';
const API_KEY = 'k58ptvvakfwwmsas25nzu48xfmc7c3tt';

function ItemsService() {

    const itemIndex = initItemIndex();
    const bossDrops = initBossDropIndex();

    this.itemsForType = itemsForType;
    this.itemInfo = itemInfo;

    function itemsForType(typeId) {
        return Promise.resolve(itemIndex[typeId]);
    }

    function itemInfo(itemId) {
        return request({
            uri: BASE_API_URL + itemId,
            qs: {
                apikey: API_KEY
            },
            json: true
        });
    }

    function initItemIndex() {
        let data = fs.readFileSync(path.resolve(dataPath, 'ItemIndex.csv'), 'utf8');
        let items = parseItemsResponse(data);

        return indexItems(items);
    }

    function initBossDropIndex() {
        let data = fs.readFileSync(path.resolve(dataPath, 'BossDrops.csv'), 'utf8');
        return indexBossDrops(data);
    }

    function indexItems(items) {
        let itemIndex = {};
        for(var i = 0;i < items.length;i++) {
            var item = items[i];
            var typeItems = itemIndex[item.type];

            if(typeItems) {typeItems.push(item);}
            else {itemIndex[item.type] = [item];}
        }

        return itemIndex;
    }

    /**
     * Using a shortcut here to avoid dealing with commas in item names.
     * Assumes that there are only three properties per line.
     * @param response
     */
    function parseItemsResponse(response) {
        var items = [];
        var lines = response.split('\n');
        for(var i = 0;i < lines.length-1;i++) {//Skip the last line.
            items.push(parseItemLine(lines[i]));
        }

        return items;
    }

    function parseItemLine(line) {
        var firstComma = line.indexOf(',');
        var lastComma = line.lastIndexOf(',');

        var id = line.slice(0, firstComma);
        var name = line.slice(firstComma+1, lastComma);
        var typeId = line.slice(lastComma+1, line.length);

        return {id: id, name: name, type: typeId.replace(/\s/, '')};
    }

    function indexBossDrops(response) {
        var bossDrops = {};
        var lines = response.split('\n');
        for(var i = 0;i < lines.length;i++) {
            var line = lines[i];
            var comma = line.indexOf(',');

            var itemId = line.slice(0, comma);
            var bossName = line.slice(comma+1, line.length);

            var bossItems = bossDrops[bossName];
            if(bossItems) {bossItems.push(itemId);}
            else {bossDrops[bossName] = [itemId];}
        }

        return bossDrops;
    }
}

module.exports = new ItemsService();