import React from 'react'
import {
    Container,
    Divider,
    Grid,
    Header,
    Image,
    List,
    Segment
} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import '../App.css'
import { Link } from "react-router-dom"

const Footer = () => (
    <div className="footer--pin">
        <Segment  inverted vertical style={{ margin: '5em 0em 0em', padding: '5em 0em', }}>
            <Container textAlign='center'>
                <Grid divided inverted stackable>
                    <Grid.Column width={3}>
                        <Header inverted as='h4' content='Explore' />
                        <List link inverted>
                            <List.Item as={ Link } to='/about'>About</List.Item>
                            <List.Item as={ Link } to='/contact'>Contact Support</List.Item>
                                <List.Item as={ Link } to='/team'>Meet the Team</List.Item>
                            <List.Item as={ Link } to='/testimonials'>Testimonials</List.Item>
                        </List>
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <Header inverted as='h4' content='Company' />
                        <List link inverted>
                            <List.Item as='a'>FAQs</List.Item>
                            <List.Item as='a'>Privacy</List.Item>
                            <List.Item as='a'>Careers</List.Item>
                            <List.Item as='a'>Help Center</List.Item>
                        </List>
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <Header inverted as='h4' content='Media' />
                        <List link inverted>
                            <List.Item as='a'>Promotions</List.Item>
                            <List.Item as='a'>Ads</List.Item>
                            <List.Item as='a'>News Letter</List.Item>
                        </List>
                    </Grid.Column>
                    <Grid.Column width={7}>
                        <Header inverted as='h4' content='Stay Connected' />
                        
                            <a href="https://twitter.com/Planthub1" target="_blank" rel="noreferrer"><i className="fab fa-twitter-square fa-2x footer-icons"></i></a>
                            <a href="https://www.instagram.com/planthub.uta/" target="_blank" rel="noreferrer"><i className="fab fa-instagram-square fa-2x footer-icons"></i></a>
                            <a href="mailto:planthub.uta@gmail.com"><i className="fas fa-envelope-open-text fa-2x footer-icons"></i></a>
                        
                    </Grid.Column>
                </Grid>

                <Divider inverted section />
                <Image centered size='small' src='./images/logo.png' />
                <List horizontal inverted divided link size='small'>
                    <List.Item as='a' href='#'>
                        Site Map
                    </List.Item>
                    <List.Item as='a' href='#'>
                        Contact Us
                    </List.Item>
                    <List.Item as='a' href='#'>
                        Terms and Conditions
                    </List.Item>
                    <List.Item as='a' href='#'>
                        Privacy Policy
                    </List.Item>
                </List>
            </Container>
        </Segment>
    </div>
)

export default Footer;
