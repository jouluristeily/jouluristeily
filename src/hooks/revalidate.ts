import { revalidatePath, revalidateTag } from 'next/cache'
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from 'payload'

const revalidatePaths = (paths: string[]) => {
  for (const path of new Set(paths.filter(Boolean))) {
    revalidatePath(path)
  }
}

const revalidateTags = (tags: string[]) => {
  for (const tag of new Set(tags.filter(Boolean))) {
    revalidateTag(tag)
  }
}

export const makeCollectionRevalidators = <
  T extends {
    id: number | string
    slug?: string | null
    key?: string | null
  },
>(
  getPaths: (doc: T | null | undefined) => string[],
  tags: string[],
): {
  afterChange: CollectionAfterChangeHook<T>
  afterDelete: CollectionAfterDeleteHook<T>
} => ({
  afterChange: ({ doc }) => {
    revalidateTags(tags)
    revalidatePaths(getPaths(doc))
    return doc
  },
  afterDelete: ({ doc }) => {
    revalidateTags(tags)
    revalidatePaths(getPaths(doc))
    return doc
  },
})

export const revalidateSiteSettings: GlobalAfterChangeHook = ({ doc }) => {
  revalidateTags(['site-settings'])
  revalidatePaths(['/', '/prices', '/events', '/gallery'])
  return doc
}
