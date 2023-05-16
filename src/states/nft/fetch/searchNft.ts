import { api } from '@/app/api';
import { MOCK_API_CALLS } from '@/config';

export async function searchNFT(query: string, signal?: AbortSignal): Promise<{
    ID: string
    name: string
    logoURL: string
    collectionID: string
}[]> {
    if (MOCK_API_CALLS) {
        await new Promise<void>(r => setTimeout(r, 200));

        return [
            {
                ID: '1',
                name: 'Porsche Cayenne',
                logoURL: 'https://s3-alpha-sig.figma.com/img/2f18/5f5e/18100085c77444b3e00e10428a0599cd?Expires=1684713600&Signature=hYwf6-BNv-lEf0wSulBi1n8F0-cQvZrzBCMu~~Q8SP3u-E8c9rgYpDFPgRg7yXCje5ndOs31Mh8FSqTuMU3DARndDpEYCTYP930qIo--wffxg95QIFJik7Q7~9cLI-~Z8rTJ9eR1GeB1PojbhoW1hzwfwGCZOCVQw2dfGqkPpoT9XA0G1QQ-6zO96vwdBDIwsBl~gA0sNr0m5fZDRUsex8NScXdpgUNjAdWYZ96OTB4DOSjXQ8LZqgoqNiJeazctS3-U5cTCIjiTI0-2aEPjGAQsaL6oysJ~rIJ9xvH7kGvYcs5rWfD34pDCKDGF0uy2TsbovJz~5AVzucGicIkMyw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
                collectionID: '1'
            }
        ];
    }

    return api.get(
        `/search/tokens/${query}`,
        { signal }
    );
}