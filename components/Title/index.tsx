import React from 'react'

interface TitleProps {
    level?: 1 | 2 | 3 | 4 | 5
}

type AllProps = TitleProps & React.HTMLAttributes<HTMLHeadingElement>

const Index: React.FC<AllProps> = ({ level = 1, children, ...rest }) => {
    const Title = `h${level}`

    return <Title {...rest}>{children}</Title>
}

export const Title = Index
