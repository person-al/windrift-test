import * as React from 'react'

import Grid from 'core/components/ui/grid'

import styles from 'public/stories/stone-harbor/styles/Index.module.scss'

const Index: React.FC = ({ children }) => {
    return (
        <Grid
            styles={styles}
            head={
                <style>
                    @import
                    url('https://fonts.googleapis.com/css2?family=STIX+Two+Math,Raleway&display=swap');
                </style>
            }>
            {children}
        </Grid>
    )
}

export default Index