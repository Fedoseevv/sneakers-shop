import React, { useCallback, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../authContext/authContext'
import { useHttp } from '../hooks/http.hook'
import Spinner from '../spinner'
import {SneakersList} from '../sneakersList/sneakersList'

export const SneakersPage = () => {
    const [sneakers, setSneakers] = useState([])
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)

    const fetchSneakers = useCallback(async () => {
        try {
            const fetched = await request('/api/sneakers', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
        
            setSneakers(fetched)
        } catch(e) {}

    }, [token, request])

    useEffect(() => {
        fetchSneakers()
    }, [fetchSneakers])


    if (loading) {
        return <Spinner/>
    }
    return (
        <>
            {!loading && <SneakersList sneakers={sneakers} /> }
        </>
    )
}