import React from 'react';
import {Button, Card, CardBody, CardFooter, CardImg, CardTitle, Col} from "reactstrap";
import {NavLink as RouterNavLink} from "react-router-dom";
import {apiURL} from "../../constants";
const Element = (props) => {
    return (
        <Col xs="12" sm="6" md="4">
            <Card className="mb-4">
                {props.image
                    ? <RouterNavLink to={props.pathRoute}>
                        <CardImg top width="100%" src={`${apiURL}/uploads/${props.image}`} alt={props.title}/>
                    </RouterNavLink>
                    : null
                }
                <CardBody>
                    <CardTitle tag={RouterNavLink} to={props.pathRoute}>
                        {props.title}
                    </CardTitle>
                </CardBody>
                {props.user && props.user.role === 'admin'
                    ? <CardFooter className="d-flex justify-content-between">
                        {props.isPublished
                            ? <Button size="sm" color="secondary" onClick={props.publish}>Unpublish</Button>
                            : <Button size="sm" color="success" onClick={props.publish}>Publish</Button>
                        }
                        <Button size="sm" color="danger" onClick={props.remove}>Delete</Button>
                    </CardFooter>
                    : null
                }
            </Card>
        </Col>
    );
};

export default Element;