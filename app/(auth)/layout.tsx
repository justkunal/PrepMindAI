import {ReactNode} from 'react'

const AutoLayout = ({ children }:{ children : ReactNode}) => {
    return (
        <div className="auth-layout">{children}</div>
    )
}
export default AutoLayout
