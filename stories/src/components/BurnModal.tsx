import * as React from 'react'
import {
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper
} from '@chakra-ui/number-input'
import { ContractWriteModal } from './ContractWriteModal'
import { ethers } from 'ethers'

export const BurnModal = () => {
    const [tokenId, setTokenId] = React.useState<number>(0)

    const burnToken = (writeConn: ethers.Contract): ethers.ContractTransaction => {
        return writeConn.burn(tokenId)
    }

    const getBody = () => {
        return (
            <>
                This will burn your token. Doing so will take us one step closer to our final poem.
                You may only destroy a gem you own. Are you ready? Note that this action requires
                Metamask.
                <br />
                <br />
                Select a gem to destroy:
                <NumberInput
                    min={0}
                    max={6}
                    onChange={(_, valueAsNumber) => setTokenId(valueAsNumber)}
                    value={tokenId}>
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            </>
        )
    }

    return (
        <ContractWriteModal
            triggerButtonText="Destroy"
            triggerButtonColorScheme="red"
            header="Destroy a gem"
            confirmButtonText="Burn"
            inProgressMessage="destroying..."
            successMessage="Destroyed!"
            modalBody={getBody()}
            callContract={burnToken}
        />
    )
}
