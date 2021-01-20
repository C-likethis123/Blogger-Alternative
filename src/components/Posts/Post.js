import React from 'react';
import styled from 'styled-components';
import { Button as BootstrapButton, Row, Col, Card as BootstrapCard, CardTitle, CardBody, CardSubtitle } from "reactstrap";
import Paths from '../../constants/paths';
import { useHistory } from "react-router-dom";

const Button = styled(BootstrapButton)`
margin-left: 15px;
`

const Card = styled(BootstrapCard)`
margin-bottom: 30px;
`

const ButtonGroup = styled(({ className, children }) => (
  <Col className={className}>
    {children}
  </Col>
))`
  text-align: center;
`

export default function Post(props) {
  const history = useHistory();
  const goToEdit = () => history.push(`${Paths.EditPost}/${props.post._id}`);
  const deletePost = () => props.deletePost(props.post._id);
  const goToView = () => history.push(`${Paths.Post}/${props.post._id}`);
  return (
    <Card>
      <CardBody>
        <Row>
          <Col>
            <CardTitle tag="h5">
              {props.post.title || '(Untitled)'}
            </CardTitle>
            <CardSubtitle>
              {props.post.isDraft ? 'Draft' : 'Published'}
            </CardSubtitle>
          </Col>
          <ButtonGroup>
            <Button color="primary" onClick={goToEdit}>
              Edit
            </Button>
            <Button color="danger" onClick={deletePost}>
              Delete
            </Button>
            <Button color="info" onClick={goToView}>
              View
            </Button>
          </ButtonGroup>
        </Row>
      </CardBody>
    </Card>
  );
};
