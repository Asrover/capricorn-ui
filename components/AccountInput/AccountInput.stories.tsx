import React, { useEffect, useMemo, useState } from 'react'
import { Meta } from '@storybook/react/types-6-0'
import AccountInput from './index'
import Title from '../Title'
import Surface from '../Surface'
import Space from '../Space'

export default {
    title: 'Components/AccountInput',
    component: AccountInput,
} as Meta

const accounts = [
    {
        id: 'USD950234894',
        currency: 'usd',
        balance: 54.55,
    },
    {
        id: 'EUR950234864',
        currency: 'eur',
        balance: 44054.55,
    },
    {
        id: 'GBP950234894',
        currency: 'gbp',
        balance: 0.0,
    },
]

export const All: React.FC = () => {
    const [account, setAccount] = useState(accounts[0])

    // const [asyncOptions, setAsyncOptions] = useState([])
    // const [loading, setLoading] = useState(true)
    // const [value, setValue] = useState()
    //
    // useEffect(() => {
    //     setTimeout(() => {
    //         setAsyncOptions(options)
    //         setLoading(false)
    //     }, 3000)
    // }, [])
    //
    // const textViewInputStyles = useMemo(
    //     () => ({
    //         caretColor: 'transparent',
    //         fontSize: 20,
    //     }),
    //     [],
    // )

    return (
        <Space column size="l">
            <Surface>
                <Title level={2}>Extends: SelectInput</Title>
            </Surface>
            <AccountInput
                label="Счет списания"
                selectedAccount={account}
                accounts={accounts}
                onChangeAccount={setAccount}
            />
            <AccountInput
                label="Счет списания"
                selectedAccount={account}
                accounts={accounts}
                onChangeAccount={setAccount}
                fieldTip="With hideAccountCurrencyIcon"
                hideAccountCurrencyIcon
            />
            {/*<AccountInput selectedOption={value9} options={options} onChange={setValue9} label="Account" />*/}
            {/*<AccountInput*/}
            {/*    type="money"*/}
            {/*    selectedOption={currency}*/}
            {/*    options={typeLabelOptions}*/}
            {/*    onChange={setCurrency}*/}
            {/*    onSearch={setValue6}*/}
            {/*    optionsLikeRightLabel*/}
            {/*    noMarginBottom*/}
            {/*    textInputValue="3000"*/}
            {/*    label="Amount and currency"*/}
            {/*    fieldTip={`Amount: ${value6} Currency: ${currency?.text}`}*/}
            {/*/>*/}
            {/*<AccountInput selectedOption={value8} options={options} onChange={setValue8} withSearch label="Search" />*/}
            {/*<AccountInput*/}
            {/*    selectedOption={value10}*/}
            {/*    options={viewTextOptions}*/}
            {/*    onChange={setValue10}*/}
            {/*    value={value10?.text || 'Choose a currency'}*/}
            {/*    view="text"*/}
            {/*    textInputStyles={textViewInputStyles}*/}
            {/*    loading={true}*/}
            {/*/>*/}
            {/*<AccountInput*/}
            {/*    selectedOption={value10}*/}
            {/*    options={viewTextOptions}*/}
            {/*    onChange={setValue10}*/}
            {/*    defaultInputValue={'Choose a currency'}*/}
            {/*    value={value10?.text}*/}
            {/*    view="text"*/}
            {/*    textInputStyles={textViewInputStyles}*/}
            {/*/>*/}
        </Space>
    )
}
