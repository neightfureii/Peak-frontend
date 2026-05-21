import { CLOUDINARY_CLOUD_NAME } from '@/constants';
import { Cloudinary } from '@cloudinary/url-gen';
import { dpr, format, quality } from '@cloudinary/url-gen/actions/delivery';
import { source } from '@cloudinary/url-gen/actions/overlay';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { text } from '@cloudinary/url-gen/qualifiers/source';
import { TextStyle } from '@cloudinary/url-gen/qualifiers/textStyle';
import { Position } from '@cloudinary/url-gen/qualifiers/position';
import { compass } from '@cloudinary/url-gen/qualifiers/gravity';
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { face } from "@cloudinary/url-gen/qualifiers/focusOn";
import { RoundCorners } from '@cloudinary/url-gen/actions/roundCorners';

const cld = new Cloudinary({ cloud: { cloudName: CLOUDINARY_CLOUD_NAME } });

export const bannerPhoto = (imageCldPubId: string, name: string) => {
    return cld
        .image(imageCldPubId)
        .resize(fill())
        .delivery(format('auto'))
        .delivery(quality('auto'))
        .delivery(dpr('auto'))
        .overlay(
            source(
                text(name, new TextStyle('roboto', 42).fontWeight('bold')).textColor('white')
            )
            .position(
                new Position()
                    .gravity(compass("west"))
                    // .offsetY(0.2)
                    .offsetX(0.02)
            )
        );
}

export const userPhoto = (imageCldPubId: string) => {
    return cld
        .image(imageCldPubId)
        .resize(
            fill()
                .width(300)
                .height(300)
                .gravity(focusOn(face()))
        )
        .roundCorners(RoundCorners.max())
        .delivery(format('auto'))
        .delivery(quality('auto'))
        .delivery(dpr('auto'));
}

export const userListPhoto = (imageCldPubId: string) => {
    return cld
        .image(imageCldPubId)
        .resize(
            fill()
                .width(50)
                .height(50)
                .gravity(focusOn(face()))
        )
        .roundCorners(RoundCorners.max())
        .delivery(format('auto'))
        .delivery(quality('auto'))
        .delivery(dpr('auto'));
}
    