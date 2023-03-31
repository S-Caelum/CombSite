import React from 'react'
import { Button, Container, Link, Navbar, Text, User } from "@nextui-org/react";
import Img from "../../public/salonHomeInfoCards/combCardTwo.png"

const Hero = ({ header, link }) => {
    return (
        <>
            <div style={{paddingTop:"4.8rem"}} className='smallHero'>
                <Container css={{height:"26rem"}} display='flex' direction='column' justify='center' alignItems='center'>
                    <Text css={{fontFamily:"Manrope"}} size='$5xl'>
                        {header}
                    </Text>
                    <Text css={{fontFamily:"Manrope"}} size='$2xl'>
                        {link}
                    </Text>
                </Container>
            </div>
        </>
    )
}

export default Hero;