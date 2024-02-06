export interface IImage {
    id: string;
    urls: {
        thumb: string;
        full: string;
    }
    links: {
        html: string
    }
    user: {
        name: string
    }
}

import type { Card, List, Board } from "@prisma/client";

export type ListWithCards = List & { cards: Card[] };

export type CardWithList = Card & { list: List };

export interface IboardCard {
    title: string
    description: string
    id: string
    listId: string
    createdAt: string
    updatedAt: string
}

export interface IboardListItem {
    id: string
    title: string
    boardId: string
    createdAt: string
    updatedAt: string
    Cards: IboardCard[]
}

export interface Iboard {
    id: string
    imageFullUrl: string
    imageId: string
    imageLinkHTML: string
    imageThumbUrl: string
    imageUserName: string
    orgId: string
    title: string
    createdAt: string
    updatedAt: string
}

export interface IdragPayload { // For dragg and drop payloads
    id: string
    title: string
    order: number
    description: any
    listId: string
    createdAt: string
    updatedAt: string
}

export interface IdropResult {
    removedIndex: number
    addedIndex: any
    payload: IdragPayload
}

export interface IboardListCard {
    id: string
    title: string
    description: string
    order?: number
    listId: string
    createdAt: string
    updatedAt: string
}
export interface IboardList {
    id: string
    title: string
    order: number
    boardId: string
    createdAt: string
    updatedAt: string
    cards: Card[]
}