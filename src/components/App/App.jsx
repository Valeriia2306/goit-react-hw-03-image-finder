import { Component } from 'react';

import * as API from '../../services/Api';
import { NotificationContainer, notifyWarning } from '../Notification';
import ImageGallery from '../ImageGallery';
import Searchbar from '../Searchbar/Searchbar';
import Title from '../MainTittle';
import { Container } from './App.styled';

import Button from '../Button';
import Loader from '../Loader';

class App extends Component {
  state = {
    items: [],
    query: '',
    page: 1,
    status: 'pending',
  };

  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      try {
        this.setState({ status: 'load' });

        const images = await API.getImages({ query, page });

        if (images.totalHits === 0) {
          this.setState({ status: 'notFound' });
          return notifyWarning(
            `Sorry, nothing was found on request "${query}"`
          );
        }

        this.setState(({ items }) => ({
          items: [...items, ...images.hits],
        }));

        setTimeout(() => {
          console.log(this.state.items.length);
          this.setState({
            status:
              images.totalHits > this.state.items.length
                ? 'loadMore'
                : 'noMore',
          });
        }, 10);
      } catch (error) {
        this.setState({ status: error.message });
        return notifyWarning(error.message);
      }
    }
  }
  handleSabmitForm = value => {
    this.setState({ query: value, page: 1, items: [] });
  };
  increasePage = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };
  render() {
    const { status } = this.state;
    return (
      <Container>
        <Searchbar onSubmit={this.handelSabmitForm} />
        <ImageGallery items={this.state.items} />

        {(status === 'pending' && (
          <Title>Search and find pictures of anything!</Title>
        )) ||
          (status === 'notFound' && <Title>Try again !</Title>)}

        {status === 'load' && <Loader />}
        {status === 'loadMore' && <Button onClick={this.increasePage} />}

        <NotificationContainer />
      </Container>
    );
  }
}

export default App;
