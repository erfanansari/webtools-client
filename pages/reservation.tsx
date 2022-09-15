import type { NextPage } from 'next'
import Link from 'next/link'
import { useState } from 'react'

const Reservation: NextPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log('onSubmit', formData)
    }

    return (
        <>
            <h1>Reservation</h1>
            <form onSubmit={onSubmit}>
                <input
                    value={formData.email}
                    onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                    }
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                />
                <br />
                <input
                    value={formData.password}
                    onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                    }
                    type="password"
                    name="password"
                    id="password"
                />
                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default Reservation
