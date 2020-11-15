import * as React from "react"
import { useSelector } from 'react-redux'
import { RootState } from "../reducers"
import dynamic from 'next/dynamic'
import { Toc } from '../types'

interface VisibleChapter {
    chapter: JSX.Element
    id: string
    sections: Array<JSX.Element>
}
const visibleChapters = (toc: Toc): Array<VisibleChapter> => {
    const chapters = Object.values(toc).filter(c => c.visible).map
        (c => {
            const chapter = React.createElement(dynamic(() =>
                import(`../../pages/chapters/${c.filename}`)))
            return {
                id: c.filename,
                chapter
            } as VisibleChapter
        })
    return chapters
}


const Game = (): JSX.Element => {
    const toc = useSelector((state: RootState) => state.toc)

    const chapters = visibleChapters(toc)
    return <div className="game">
        {
            chapters.map((chapter) => (
                <div key={chapter.id}>
                    {chapter.chapter}
                </div>
            ))
        }
    </div>
}
export default Game