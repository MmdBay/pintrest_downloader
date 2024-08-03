import * as cheerio from 'cheerio';
import axios, { AxiosError, AxiosResponse } from 'axios';

export const extractDataFromPinterestUrl = async (url: string): Promise<any> => {
    try {
        const responsePinterstData: AxiosResponse = await axios(url)
        
        const $ = cheerio.load(responsePinterstData.data);
        const mediaDataUrl = $('[data-test-id="video-snippet"]').html()
        const forCaption: any = $('[data-relay-response="true"]').html()
        if (mediaDataUrl == null) {
            const parsedData = JSON.parse(forCaption).response.data.v3GetPinQuery.data
            return {
                contentUrl: parsedData?.contentUrl,
                thumbnailUrl: parsedData?.imageLargeUrl,
                caption: parsedData?.closeupUnifiedDescription,
            }
        }
        if (mediaDataUrl) {
            const parsedData = JSON.parse(mediaDataUrl)
            const parsedD = JSON.parse(forCaption).response.data.v3GetPinQuery.data                        
            return {
                contentUrl: parsedData?.contentUrl,
                thumbnailUrl: parsedData?.thumbnailUrl,
                caption: parsedD?.closeupUnifiedDescription,
            }
        }
    } catch (error) {
        console.error(error + ' : extractDataFromPinterestUrl');
        const axiosError = error as AxiosError;
        console.error('Error message:', axiosError.message);
        if (axiosError.response) {
            console.error('Status:', axiosError.response.status);
            console.error('Data:', axiosError.response.data);
        }
    }
}