import * as Yup from 'yup';

const createEditChannelSchema = (t) => Yup.object().shape({
  name: Yup.string()
    .required(t('errors.required'))
    .min(3, t('errors.channelName.counter.count_few', { minCount: 3, maxCount: 20 }))
    .max(20, t('errors.channelName.counter.count_few', { minCount: 3, maxCount: 20 })),
});

export default createEditChannelSchema;
