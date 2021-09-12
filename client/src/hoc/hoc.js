import React from 'react'
import SneakersServiceContext from '../sneakers-service-context'

const WithSneakersService = () => (Wrapped) => {
    return (props) => {
        return (
            <SneakersServiceContext.Consumer>
                {
                    (SneakersService) => {
                        return <Wrapped {...props} SneakersService={SneakersService}/>
                    }
                }
            </SneakersServiceContext.Consumer>
        )
    }
}

export default WithSneakersService;