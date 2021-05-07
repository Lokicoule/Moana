import { ConfigType } from '@nestjs/config';
import { v2 } from 'cloudinary';
import cloudinaryConfig from './cloudinary.config';

export const CloudinaryProvider = {
  provide: 'Cloudinary',
  useFactory: (config: ConfigType<typeof cloudinaryConfig>): void => {
    return v2.config({
      cloud_name: config.cloud.cloudName,
      api_key: config.cloud.apiKey,
      api_secret: config.cloud.apiSecret,
    });
  },
  inject: [cloudinaryConfig.KEY],
};
