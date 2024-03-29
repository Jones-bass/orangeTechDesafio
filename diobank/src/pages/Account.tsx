import { Center, SimpleGrid, Spinner } from "@chakra-ui/react"
import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

import CardInfo from "../components/CardInfo"
import { api } from "../services/api"

import { useAuth } from "../hooks/useAuth"

interface UserData {
    email: string
    password: string
    name: string
    balance: number
    id: string
}

export function Account() {
    const [userData, setUserData] = useState<null | UserData>()
    const { id } = useParams()
    const navigate = useNavigate()

    const { isLoggedIn } = useAuth()

    !isLoggedIn && navigate('/')

    useEffect(() => {
        const getData = async () => {
            const data: any | UserData = await api
            setUserData(data)
        }

        getData()
    }, [])

    const actualData = new Date()

    if (userData && id !== userData.id) {
        navigate('/')
    }

    return (
        <Center>
            <SimpleGrid columns={2} spacing={8} paddingTop={16}>
                {
                    userData === undefined || userData === null ?
                        (
                            <Center>
                                <Spinner size='xl' color='white' />
                            </Center>
                        ) :
                        (
                            <>
                                <CardInfo mainContent={`Bem vindo(a): ${userData?.name}`} content={`${actualData.getDay()} / ${actualData.getMonth()} / ${actualData.getFullYear()} ${actualData.getHours()}:${actualData.getMinutes()}`} />
                                <CardInfo mainContent='Saldo' content={`R$ ${userData.balance}`} />
                            </>
                        )
                }
            </SimpleGrid>
        </Center>
    )
}

