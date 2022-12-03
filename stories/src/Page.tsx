import * as React from 'react'
import { Header } from './components/Header'

export const Page = ({ body }: { body: JSX.Element | React.ReactNode }) => (
    <>
        <Header />
        {body}
    </>
)
