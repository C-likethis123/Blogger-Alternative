import React from 'react';
import renderer from 'react-test-renderer';
import CreatePost from '../CreatePost';

test('Renders as expected', () => {
    const createPostComponent = renderer.create(<CreatePost />);
    const componentInJson = createPostComponent.toJSON();
    expect(componentInJson).toMatchSnapshot();
})
