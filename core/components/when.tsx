import * as React from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

interface WhenProps {
    condition: any
    otherwise?: React.ReactNode
    children?: React.ReactNode
}

const When = ({ children, condition, otherwise }: WhenProps): JSX.Element => {
    // eslint-disable-next-line no-extra-boolean-cast
    if (!!condition) {
        return (
            <TransitionGroup component={null}>
                <CSSTransition in={true} {...WhenTransition}>
                    <span className="windrift--when">{children}</span>
                </CSSTransition>
            </TransitionGroup>
        )
    }
    if (otherwise) {
        return (
            <TransitionGroup>
                <CSSTransition in={true} {...WhenTransition}>
                    <span className="windrift--when">{otherwise}</span>
                </CSSTransition>
            </TransitionGroup>
        )
    }
    return null
}

export default When

const WhenTransition = {
    classNames: 'windrift--when',
    timeout: {
        appear: 500,
        enter: 500,
        exit: 300
    },
    'aria-live': 'polite'
}
