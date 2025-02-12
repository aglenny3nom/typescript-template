import React, { FC, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faCheck,
  faCreditCard,
  faDollarSign,
} from '@fortawesome/fontawesome-free-solid';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import cx from 'classnames';
import { useRouter } from 'next/router';
import styles from './PaymentContents.module.css';
import { DealerHeader } from '../DealerHeader/DealerHeader';
import { PaymentTab } from './PaymentTab/PaymentTab';
import { PaymentsTable } from './PaymentsTable/PaymentsTable';
import { useAppDispatch } from '../../app/hooks';
import {
  adminDashboardSelector,
  loadPayments,
} from '../../features/adminDashboardSlice';
import { UserPaymentsInterface } from '../../contracts/user-payments';
import { useSelector } from 'react-redux';
import * as CurrencyFormat from 'react-currency-format';
import moment from 'moment';
import { userSelector } from '../../features/authSlice';



interface Props {
  amountRemaining: any;
  paymentsRemaining: any;
  title?:string
}

export const PaymentContents: FC<Props> = ({
  amountRemaining,
  paymentsRemaining,
  title
}) => {
  const { userActiveAccount, userPayments } = useSelector(
    adminDashboardSelector
  );

  let startPayment;
  let lastPayment;
  let total;
  let salesTax;
let weekly;
  if (userPayments.length) {
    startPayment = userPayments && userPayments[0].ScheduledDate;
    lastPayment = userPayments && userPayments.slice(-1)[0].ScheduledDate;
    weekly = userPayments?.map((payment) => payment.Amount)[0];
  }


const user = useSelector(userSelector)
console.log(user)
  const {
    FirstName,
    LastName,
    VehicleMake,
    VehicleModel,
    VehicleYear,
    AmountFinanced,
    VehicleTransmission,
    VehicleMileage,
    PurchasePrice,
    HowLong,
    VehicleColor,
    VehicleEngine,
    TLCTrackerFee,
    SalesTax,
    ApplicationID,
    VIN
    
  } = userActiveAccount;

console.log(userActiveAccount)

  let accountNumber = 0;
  if (userPayments.length && userPayments[0].AccountNumber) {
    accountNumber = userPayments[0].AccountNumber;
  }

  if (SalesTax === null) {
    salesTax = 0;
    total = 0 + PurchasePrice;
  } else {
    total = SalesTax + PurchasePrice;
  }

  const dispatch = useAppDispatch();

  const router = useRouter();
  let handleBack;

  if(user && user.ProfileTypeID === '2'){
    handleBack = (): void => void router.push('/dealership');
  }
  else{
    handleBack = (): void => void router.back();
  }
 

  return (
    <div className={styles.wrapper}>
      <DealerHeader title={title} />
      <div className={styles.contentWrapper}>
        <div className={styles.contentHeader}>
          <div className={styles.contentTitle}>
            <FontAwesomeIcon
              icon={faCheck as IconProp}
              className={styles.titleIcon}
            />
            <h2>{ApplicationID}</h2>
          </div>
        </div>
        <div className={styles.dashboardBar}>
          <div className={styles.dashboardActions}>
            <div className={styles.backButton} onClick={handleBack}>
              <FontAwesomeIcon
                icon={faArrowLeft as IconProp}
                className={styles.backIcon}
              />
              Back
            </div>
            <h4>
              {FirstName} {LastName}
            </h4>
          </div>
        </div>
        <ul className={styles.nav}>
          <li className={styles.navItem}>
            <button>Payments</button>
          </li>
          <li className={cx(styles.navItem, styles.navItemInactive)}>
            <button onClick={() => router.back()} >Client details</button>
          </li>
        </ul>
        <div className={styles.paymentDetailsWrapper}>
          <div className={styles.tabsRow}>
            <PaymentTab
              icon={faDollarSign as IconProp}
              text="Amount Financed"
              value={
                <CurrencyFormat
                  className={styles.currency}
                  value={AmountFinanced}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'$'}
                />
              }
            />
            <PaymentTab
              icon={faDollarSign as IconProp}
              text="Total remaining"
              value={
                <CurrencyFormat
                  className={styles.currency}
                  value={amountRemaining}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'$'}
                />
              }
            />
            <PaymentTab
              icon={faCreditCard as IconProp}
              text="Weekly term"
              value={
                <CurrencyFormat
                  className={styles.currency}
                  value={weekly}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'$'}
                />
              }
            />
            <PaymentTab
              className={styles.paymentsRemaining}
              icon={faCreditCard as IconProp}
              text="Payments remaining"
              value={
                <span className={styles.currency}>
                  {paymentsRemaining }
                </span>
              }
            />
          </div>
          <div className={styles.carDetails}>
            <div>
              <div className={styles.carDetailsPerks}>
                  <p>
                {VehicleYear !== 0 && VehicleYear}  {VehicleMake}{" "}
                {VehicleModel}
              </p>
              <p>
                Vin: {VIN}
              </p>
              </div>
            
            </div>
            <div>
              <div className={styles.carDetailsPerks}>
                <p>Engine:</p>
                <span>{VehicleEngine}</span>
              </div>
              <div className={styles.carDetailsPerks}>
                <p>Current Odometer:</p>
                <span>{VehicleMileage}</span>
              </div>
            </div>

            <div>
              <div className={styles.carDetailsPerks}>
                <p>Exterior Color:</p>
                <span>{VehicleColor}</span>
              </div>
              <div className={styles.carDetailsPerks}>
                <p>Interior Color:</p>
                <span>N/A</span>
              </div>
            </div>

            <div>
              <div className={styles.carDetailsPerks}>
                <p>Drivetrain:</p>
                <span>Front Wheel drive</span>
              </div>
              <div className={styles.carDetailsPerks}>
                <p>Transmission:</p>
                <span>{VehicleTransmission}</span>
              </div>
            </div>
            {/* <div className={styles.carDetailsBody}>
              
            </div> */}
          </div>
          <div className={styles.infoHistory}>
            <div className={styles.info}>
              <h4>Information</h4>
              <div className={styles.tableInfo}>
                <div className={styles.infoBar}>
                  <p>Car cost</p>
                  <span>
                    <CurrencyFormat
                      value={PurchasePrice}
                      displayType={'text'}
                      thousandSeparator={true}
                      prefix={'$'}
                    />
                  </span>
                </div>
                <div className={styles.infoBar}>
                  <p>Deposit:</p>
                  {/* <span><CurrencyFormat  value={PurchasePrice}  displayType={'text'} thousandSeparator={true} prefix={'$'} /></span> */}
                </div>
                <div className={styles.infoBar}>
                  <p>TLC/DMV Tracker:</p>
                  {TLCTrackerFee ? (
                    <span>
                      <CurrencyFormat
                        value={SalesTax}
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={'$'}
                      />
                    </span>
                  ) : (
                    <span>$0</span>
                  )}
                </div>
                <div className={styles.infoBar}>
                  <p>Sales Tax:</p>
                  {SalesTax ? (
                    <span>
                      <CurrencyFormat
                        value={SalesTax}
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={'$'}
                      />
                    </span>
                  ) : (
                    <span>$0</span>
                  )}
                </div>
                <div className={styles.infoBar}>
                  <p>Total:</p>
                  <span>
                    <CurrencyFormat
                      value={total}
                      displayType={'text'}
                      thousandSeparator={true}
                      prefix={'$'}
                    />
                  </span>
                </div>
                <div className={styles.infoBar}>
                  <p>Start Payment:</p>
                  <span>{moment(startPayment).format('MM/DD/YYYY')}</span>
                  {/* <span><CurrencyFormat  value={PurchasePrice}  displayType={'text'} thousandSeparator={true} prefix={'$'} /></span> */}
                </div>
                <div className={styles.infoBar}>
                  <p>End Payment:</p>
                  <span>{moment(lastPayment).format('MM/DD/YYYY')}</span>

                  {/* <span><CurrencyFormat  value={PurchasePrice}  displayType={'text'} thousandSeparator={true} prefix={'$'} /></span> */}
                </div>
                <div className={styles.infoBar}>
                  <p>IRR on deal at Inception (weekly):</p>
                  {/* <span><CurrencyFormat  value={PurchasePrice}  displayType={'text'} thousandSeparator={true} prefix={'$'} /></span> */}
                </div>
                <div className={styles.infoBar}>
                  <p>IRR on deal at Inception (Annual):</p>
                  {/* <span><CurrencyFormat  value={PurchasePrice}  displayType={'text'} thousandSeparator={true} prefix={'$'} /></span> */}
                </div>
                <div className={styles.infoBar}>
                  <p>IRR weighting factor:</p>
                  {/* <span><CurrencyFormat  value={PurchasePrice}  displayType={'text'} thousandSeparator={true} prefix={'$'} /></span> */}
                </div>
                <div className={styles.infoBar}>
                  <p>NETT present value:</p>
                  {/* <span><CurrencyFormat  value={PurchasePrice}  displayType={'text'} thousandSeparator={true} prefix={'$'} /></span> */}
                </div>
              </div>
            </div>
            <div className={styles.paymentTable}>
              <h4>Payment history</h4>
              <PaymentsTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
