import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { GetSignedUploadURLResponse } from '@photo/dto/upload.queries.dto';
import { v2 } from 'cloudinary';
import cloudinaryConfig from './cloudinary.config';

@Injectable()
export class CloudinaryService {
  constructor(
    @Inject(cloudinaryConfig.KEY)
    private config: ConfigType<typeof cloudinaryConfig>,
  ) {}

  makeSignedURL(folder: string, filename: string) {
    this.makeDownloadURL();
    const timestamp = Math.round(new Date().getTime() / 1000);
    const options = {
      timestamp,
      folder,
      public_id: filename,
      use_filename: true,
      unique_filename: false,
      type: 'private',
    };
    const signature = v2.utils.api_sign_request(
      { ...options },
      this.config.cloud.apiSecret,
    );
    const url = new URL(
      `https://api.cloudinary.com/v1_1/${this.config.cloud.cloudName}/auto/upload`,
    );
    for (const key in options) url.searchParams.set(key, options[key]);
    url.searchParams.set('signature', signature);
    url.searchParams.set('api_key', this.config.cloud.apiKey);
    return {
      filename,
      url: url.toString(),
    } as GetSignedUploadURLResponse;
  }

  async makeDownloadURL() {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 14);
    const timestamp = Math.round(expiresAt.getTime() / 1000);

    const downloadUrl = await v2.utils.private_download_url(
      'f0c1b33d-a002-4778-a351-fb5c135c95bf/608ea1c1cef78451f225a137/DSC_2324.JPG',
      'jpg',
      {
        expires_at: timestamp,
        attachment: true,
      },
    );
    console.log(downloadUrl);
  }
}
