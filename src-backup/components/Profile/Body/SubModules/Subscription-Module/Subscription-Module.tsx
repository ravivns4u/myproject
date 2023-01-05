import { Box, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useAppSelector } from '../../../../../redux/app/hooks';
import { updateSubscription } from '../../../../../redux/slices/subscription';
import { useDispatch } from 'react-redux';
import Footer from '../../../../Footer/Footer';
import useOnScreen from '../Terms/useOnScreen';

const SubscriptionModule = () => {
  const myRef = React.useRef();
  const dispatch = useDispatch();
  const onScreen = useOnScreen(myRef);

  React.useEffect(() => {
    if (onScreen) {
      dispatch(updateSubscription({ isSubscription: true }));
    }
  }, [onScreen]);

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant='h4' component='div' gutterBottom>
        <b>
          <u>BREAK FREE SUBSCRIPTION MODULE</u>
        </b>
      </Typography>
      <br />
      <Typography variant='body1' gutterBottom>
        We at Break-free want you to explore your full potential by helping you market all your “offerings” better and
        stand out from the crowd.
        <br />
        <br />
        Work with clients who are looking for talented creators like yourself. Break Free is made to cater to its
        exclusive customers making it easy for you all by reducing the competition with an unsaturated market and thus
        giving you better results.
        <br />
        <br />
        Forget old rules and make new ones for yourself, as a part of the membership subscription with a fee of only Rs
        500/- per month.
      </Typography>
      <br />
      <Typography variant='h4' component='div' gutterBottom>
        <b>
          <u>SUBSCRIPTION BENEFITS</u>
        </b>
      </Typography>

      <Typography variant='body1' gutterBottom>
        <ol>
          <li>
            Be an all rounder - You can upload multiple portfolios, services, events and products, you can handle all
            your “OFFERINGS” under one roof and can multitask and promote your various talents through one single
            platform.
          </li>
          <li>
            Reviews/ratings - You can check reviews and ratings given by your customers and improve your performance.
            Also you can build credibility and get on the top of the ladder.
          </li>
          <li>
            Ease of communication - once you get an order request, you can easily clear your doubts through email
            communication, thus making sure that all your conversations are official.
          </li>
          <li>
            Legit customers - you will get the surety that you are being paid for what you deserve and you can build
            trustworthy relationships and gain new long term customers.
          </li>
          <li>Take Control -You can accept or reject projects according to your own preferences.</li>
          <li>
            Management tools - you can keep track of your orders - awaiting, accepted and rejected and you can maintain
            your work schedule easily. Make your work life easy!
          </li>
          <li>
            Networking -You can network with different artists of your field and from other fields and you can learn,
            teach and collaborate - all under a cost friendly platform.
          </li>
          <li>
            Promotions -Using the stories feature, you can promote your events, gigs, workshops etc and reach out to
            your direct target audience.
          </li>
          <li>
            Collaborations - you can collaborate with different artists and share your resources with each other and
            mutually grow and benefit from each other.
          </li>
          <li>
            Workshop/ training - you can connect with the bigger names in the industry to learn new skills and upgrade
            your portfolio. You can also teach - if you love to impart your knowledge and help other budding artists of
            your field.
          </li>
          <li>
            Cost friendly - Just for Rs 500 per month you can do all this and much more - this can help you explore and
            reassure your passion is still afresh and its not lost in the midst of this busy world.
          </li>
          <li>
            Exclusivity - this is an exclusive network made just for “you all”, Break Free is a platform which caters to
            only “talented creators” like you all, so it is different from other mass platforms like - upwork, amazon
            etc. This platform caters to only “talented service professionals” hence be assured of getting the best
            customers and having fair competition from within your industry only, this can help you in making your “name
            and fame” in the industry through right medium/sources and to gain good target audience. Carter to your
            specific industry.
          </li>
          <li>
            Unsaturated market - Break Free network has only legit and verified service professionals, mostly Indian
            audience, so the competition is fair and per profile opportunities are more.
          </li>
          <li>
            Better results - “all in one marketplace” helps you to put all your offerings under one roof and hence gain
            something through each of your offerings. You can fully change your dynamics and get better assured results.
          </li>
          <li>
            Saas module - A user friendly and very reliable and easily accessible module helps you to easily keep track
            of orders, maintain your work calendar, analyse your performance, build strong network, promote your work
            and follow your dreams&#8260; passion -place without any hassle - it&apos;s a marketplace that has it all!
          </li>
          <li>
            You can play multiple roles - you can be a freelancer, a job seeker , a project contractor, a salesman, a
            teacher, or anyone you want to be - at a trusted marketplace.
          </li>
        </ol>
      </Typography>
      <br />
      <Typography variant='h5' component='div' gutterBottom>
        PRICING POLICY
      </Typography>
      <br />
      <Typography variant='body1' gutterBottom>
        <ul>
          <li>The subscription fee is calculated including GST.</li>
          <li>Once paid the membership charges are non-refundable.</li>
          <li>The subscription period is for 3 months with an additional ONE MONTH FREE.</li>
          <li>The subscription shall be renewed once the validity ends else you’ll lose the membership.</li>
        </ul>
      </Typography>
      <br />
      <Box ref={myRef}>
        <Typography variant='h5' component='div' gutterBottom>
          DISCLAIMER
        </Typography>
        <br />
        <Typography variant='body1' gutterBottom>
          There is no service guarantee, the number of customers and orders will solely depend on your portfolio and
          potential.
        </Typography>
      </Box>
      <br />
      <br />
      <Box sx={{ ml: '-2rem', mr: '-2rem', mb: '-2rem' }}>
        <Footer />
      </Box>
    </Box>
  );
};

export default SubscriptionModule;
