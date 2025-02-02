/*
 *  Copyright 2022 Collate.
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *  http://www.apache.org/licenses/LICENSE-2.0
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import { Carousel } from 'antd';
import { t } from 'i18next';
import { uniqueId } from 'lodash';
import React from 'react';
import { LOGIN_SLIDE } from '../../constants/Login.constants';

const LoginCarousel = () => {
  return (
    <div className="carousal-container" data-testid="carousel-container">
      <Carousel autoplay dots autoplaySpeed={1500}>
        {LOGIN_SLIDE.map((data) => (
          <div
            className="text-center"
            data-testid="slider-container"
            key={uniqueId()}>
            <img
              alt="slider"
              loading="lazy"
              src={data.image}
              style={{ display: 'initial' }}
              width="750px"
            />

            <p
              className="text-center m-t-md carousal-description font-medium text-white text-xl"
              data-testid="carousel-slide-description">
              {t(`message.${data.descriptionKey}`)}
            </p>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default LoginCarousel;
