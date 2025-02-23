import * as React from 'react'
import { Section, Chapter } from 'core/components'
import { PageType } from 'core/types'
import { Button } from '@chakra-ui/button'
import ChapterPage from './ChapterPage'
import { useBlockchainContext } from 'stories/src/components/BlockchainContext'
import { Pages, useNavContext } from 'stories/src/components/NavContext'

export const Page: PageType = () => {
    const { hasMinted } = useBlockchainContext()
    const { setCurrPage } = useNavContext()

    const getLastLine = () => {
        if (hasMinted) {
            return ' In the meantime, well, you have another adventure to begin.'
        } else {
            return ' Besides, you have a feeling your adventure is only just beginning.'
        }
    }

    return (
        <ChapterPage>
            <Chapter filename="chapter6">
                <Section>
                    <p>
                        You arrive back to your apartment just before the break of dawn, a renewed
                        excitement vibrating through every bone in your body. You don't know if
                        you'll ever see The Shopkeeper again, but you know you'll never forget her.
                        {getLastLine()}
                    </p>
                    <Button colorScheme="yellow" onClick={() => setCurrPage(Pages.CurrStatus)}>
                        End
                    </Button>
                </Section>
            </Chapter>
        </ChapterPage>
    )
}
