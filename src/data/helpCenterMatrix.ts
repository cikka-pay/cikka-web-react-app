export interface SupportMatrixItem {
  question: string;
  notes?: string[];
  solution: string;
}

export interface SupportMatrixCategory {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  cardDescription: string;
  items: SupportMatrixItem[];
}

export const SUPPORT_MATRIX_CATEGORIES: SupportMatrixCategory[] = [
  {
    id: "auth-kyc-security",
    number: "1",
    title: "Auth, PAN KYC & Security Lock",
    shortTitle: "Auth & KYC",
    cardDescription: "OTP login, PAN KYC verification, Device Lock, and Cikka PIN setup.",
    items: [
      {
        question: "Where do I log in?",
        solution:
          "Enter your 10-digit registered number to get a 6-digit SMS OTP; wait for the resend timer or check SMS spam if delayed.",
      },
      {
        question: "Why is my OTP not verifying?",
        solution:
          "Request a fresh 6-digit OTP on the OTP screen and ensure no extra spaces or stale codes are entered.",
      },
      {
        question: "Where do I add my PAN card for KYC?",
        solution:
          "Go to the PAN step during onboarding (or check KYC status in Profile) and enter your valid 10-character PAN.",
      },
      {
        question: "Why does it say my PAN format is invalid?",
        solution:
          "PAN must strictly match ABCDE1234F (5 uppercase letters + 4 digits + 1 uppercase letter, zero spaces).",
      },
      {
        question: "How do I set up or switch between Device Lock and Cikka PIN?",
        solution:
          "Choose Device Lock (OS fingerprint/face/PIN) or set a 4-digit Cikka PIN; if Device Lock says no lock is found, enable a phone lock in OS Settings first.",
      },
      {
        question: "Why does Cikka ask for my PIN/biometric again after switching apps?",
        solution:
          "For security, Cikka hides balances in the app switcher and re-locks automatically after 4+ seconds in the background.",
      },
    ],
  },
  {
    id: "cards-bbps",
    number: "2",
    title: "Credit Cards & Live Bill Fetching (BBPS)",
    shortTitle: "Cards & BBPS",
    cardDescription: "Add cards, fetch live utility bills, receipts, and BBPS disputes.",
    items: [
      {
        question: "Where do I add a new Credit Card to Cikka?",
        solution:
          "Open the Cikka Pay tab -> tap + Add, or go to Saved Cards -> Add card, and enter card details.",
      },
      {
        question: "Where can I view or remove my saved cards?",
        solution:
          "Open Saved Cards (or Profile -> Saved Cards) to view cards or tap remove to delete one.",
      },
      {
        question: "How can I fetch and check my live Credit Card or utility bill details?",
        solution:
          "Open Cikka Pay or tap any utility category tile, select your biller, and enter your consumer/card number to fetch live dues and due date.",
      },
      {
        question: "Where are electricity, recharge, FASTag, gas, loan, and tax payments?",
        solution:
          "Open the Pay tab and tap the service tile directly (Electricity, Mobile Recharge, DTH, FASTag, Piped Gas, Water, Cylinder, Cable TV, Insurance, Loans, Taxes, GST).",
      },
      {
        question: "Why didn't my bill details load during fetch?",
        solution:
          "Confirm your Consumer/Account ID matches the selected biller, check that a current bill is due (some billers are prepaid/fetch-less), and ensure your phone is OTP-verified.",
      },
      {
        question: "Where do I download bill receipts or check BBPS Transaction IDs?",
        solution:
          "Open Payment History and tap any bill payment row to see its bbpsTxnId, refId, amount paid, and shareable receipt.",
      },
      {
        question: "Where do I raise a dispute for a BBPS bill not updated by the biller?",
        solution:
          "Open Payment History -> tap Disputes at the top to launch Setu's official BBPS Dispute Center with your transaction reference.",
      },
    ],
  },
  {
    id: "upi-payments",
    number: "3",
    title: "UPI Options & Payment Troubleshooting",
    shortTitle: "UPI & Payments",
    cardDescription: "Choose UPI apps, check pending payments, and Auto-Pay reminders.",
    items: [
      {
        question: "Where do I choose Google Pay, PhonePe, Paytm, BHIM UPI?",
        solution:
          "Tap Pay Bill on a card to open Payment Options (UPI apps, Total/Min/Custom due) or choose UPI inside Bill Pay and Checkout.",
      },
      {
        question: "My UPI/card amount was debited, but status is Pending — how do I check?",
        solution:
          "Wait a few minutes without paying again, then pull to refresh Payment History (for bills) or My Orders (for Mall); failed charges auto-refund to source in 5–7 business days.",
      },
      {
        question: "How do I set or view an Auto-Pay schedule reminder?",
        solution:
          "Tap Schedule on your card in Home or Pay to configure reminder preferences before due dates.",
      },
    ],
  },
  {
    id: "cikka-mall",
    number: "4",
    title: "Cikka Mall, Cart & Checkout",
    shortTitle: "Cikka Mall",
    cardDescription: "Browse products, Wishlist, Wallet Cashback, addresses, and delivery.",
    items: [
      {
        question: "Where can I browse Cikka Mall products, categories, or my Wishlist?",
        solution:
          "Open the Mall tab to browse/search, tap any category for filtered items, or open Wishlist/Favorites for saved products.",
      },
      {
        question: 'Why does checkout ask me to remove a "preview" item from my bag?',
        solution:
          "Preview/demo items aren't live seller inventory; remove them inside Your Bag so only live verified products proceed to Razorpay checkout.",
      },
      {
        question: "How do I apply Cikka Wallet Cashback or pick Express 2-Day delivery?",
        solution:
          "Open Your Bag or Checkout, toggle Use Cashback (up to 20%, max ₹200 per order), and select Standard (FREE) or Express (₹50).",
      },
      {
        question: "Where do I add or change my delivery address before paying?",
        solution:
          "Add, edit, or select your shipping address directly inside Checkout or anytime from Profile -> Delivery Addresses.",
      },
      {
        question: "Why can't I spend CI Points on Cikka Mall checkout?",
        solution:
          "CI Points live in your Rewards Wallet and can only be redeemed inside the Rewards Store for Brand Vouchers and Featured Rewards Products.",
      },
    ],
  },
  {
    id: "orders-returns",
    number: "5",
    title: "Order Tracking, Returns, Exchanges & Reviews",
    shortTitle: "Orders & Returns",
    cardDescription: "Track Shipway orders, returns, exchanges, and verified reviews.",
    items: [
      {
        question: "How do I track my Cikka Mall or Rewards order?",
        solution:
          "Open Orders, pull down to refresh, and tap any order to see the courier name, Shipway tracking number, and live milestone timeline (Placed -> Packed -> In transit -> Delivered).",
      },
      {
        question: "How do I cancel or return a delivered order?",
        solution:
          "Open the order in Orders (or Profile -> Orders) to submit a cancellation/return; pre-delivery returns auto-approve, and delivered returns are reviewed within 24h for Shipway reverse pickup & refund.",
      },
      {
        question: "How do I exchange an item for another size or product?",
        solution:
          "Trigger Exchange on your delivered order to initiate reverse pickup and browse replacement items directly inside Cikka Mall.",
      },
      {
        question: "Where do I rate a product or read verified customer reviews?",
        solution:
          "Open any product -> tap See all reviews -> Write a Review, or rate directly from your delivered order card in Orders.",
      },
    ],
  },
  {
    id: "rewards-wallet",
    number: "6",
    title: "Rewards Wallet, Cikka Wallet & Brand Vouchers",
    shortTitle: "Rewards & Wallet",
    cardDescription: "CI Points, Cashback withdrawals, gift cards, and Rewards Store.",
    items: [
      {
        question:
          "Where can I check my CI Points balance (Rewards Wallet) and Cashback balance (Rewards Wallet)?",
        notes: [
          "In the Rewards Wallet: Available balance (total).",
          "In the Rewards Store: Total withdrawn amount.",
        ],
        solution:
          "Open Wallet to switch between Cashback (₹) and CI Points balances along with transaction history.",
      },
      {
        question: "Where do I see every CI Point earned or redeemed?",
        solution:
          "Open CI Rewards Ledger (or the Ledger tab inside Wallet) for a complete chronological log of credits and redemptions.",
      },
      {
        question: "How do I withdraw Cashback to my bank account?",
        solution:
          "Open Wallet -> tap Withdraw! -> pick an amount (up to ₹25,000 per request) -> confirm transfer to your linked bank account.",
      },
      {
        question: "Why haven't my Cashback or CI Points credited yet after paying?",
        solution:
          "BBPS rewards credit only after Setu confirms SUCCESS, and Mall rewards are protected/released according to order delivery and return-window checks.",
      },
      {
        question:
          "Where do I redeem CI Points for Brand Gift Cards (Swiggy, Zomato, Amazon, etc.)?",
        solution:
          "Open Rewards -> Coupons, pick any brand and denomination, and confirm — zero processing fees are charged.",
      },
      {
        question: "Where do I find my redeemed Gift Card code, 16-digit number, and PIN?",
        solution:
          "Open My Coupons, tap your voucher card, hit Reveal to view/copy the 16-digit code and PIN, or mark it as Used.",
      },
      {
        question:
          "How do I redeem a physical product in the Rewards Store, and why is there an ₹11.79 / ₹61.79 fee?",
        solution:
          "Open Rewards -> Products, add the item to C-Cart, and pay only the ₹11.79 Standard (₹9.99 + GST) or ₹61.79 Express delivery fee at checkout.",
      },
    ],
  },
  {
    id: "alerts-escalation",
    number: "7",
    title: "Account Alerts & Escalation",
    shortTitle: "Alerts & Support",
    cardDescription: "Payment reminders, order alerts, and Support Desk tickets.",
    items: [
      {
        question: "Where can I view missed payment alerts or order notifications?",
        solution:
          "Open Notifications from the Home bell icon or Profile to inspect bill reminders, order updates, and wallet alerts.",
      },
      {
        question: "How do I raise a complaint if my issue is still unresolved?",
        solution:
          "Open Support Desk to submit a ticket with your Category, Order ID, or Transaction ID, and track replies under closed/active tickets.",
      },
    ],
  },
];
