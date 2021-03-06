import React from 'react';
import { shallow, mount } from 'enzyme';

import App from '../components/App.js';
import MediaPlayer from '../components/MediaPlayer.js';
import TogglePlay from '../components/TogglePlay.js';

describe('App', () => {
  test('should render snapshot', () => {
    const wrapper = mount(<App />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('<MediaPlayer />', () => {
  const song = {
    song_name: '10,000 Hours',
    music_genre: '#Pop',
    band_name: 'Dan + Shay',
    album_image: 'https://fec-media-player.s3.us-east-2.amazonaws.com/10%2C000.jpg',
    song_url: 'https://fec-media-player.s3.us-east-2.amazonaws.com/Dan+%2B+Shay%2C+Justin+Bieber+-+10%2C000+Hours+(LYRICS).mp3',
    release_date: '3 October 2019'
  };
  test('should accepts song props', () => {
    const wrapper = mount(<MediaPlayer song={song} />);
    expect(wrapper.props().song).toEqual(song);
  });
});

describe('Play/Pause button', () => {
  const mockFn = jest.fn();
  test('play button should be defined', () => {
    expect(TogglePlay).toBeDefined();
  });
  test('should render play button correctly', () => {
    const wrapper = shallow(<TogglePlay name='play button test' />);
    expect(wrapper).toMatchSnapshot();
  });
  test('should have a play button value', () => {
    const wrapper = shallow(<TogglePlay name='play button test' />);
    expect(typeof(wrapper.find('.play').node.props.value)).toBe('string');
    expect(wrapper.find('.play').node.props.value).toEqual('play button test');
  });
  test('should call mock function when play button is clicked', () => {
    const wrapper = shallow(<TogglePlay name='play button test' handClick={mockFn} />);
    wrapper.simulate('click');
    expect(mockFn).toHaveBeenCalled();
  });
});