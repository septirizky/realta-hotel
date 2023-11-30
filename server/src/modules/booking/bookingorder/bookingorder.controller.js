import model from '../../../model/init-models.js';

export const getAllBookingOrders = async (req, res) => {
  try {
    const result = await model.booking_orders.findAll({
      include: {
        model: model.booking_order_detail,
        as: 'booking_order_details',
        required: true,
      },
    });

    res.status(200).json({
      message: 'Berhasil menampilkan data booking orders',
      data: result,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllBookingDetailExtra = async (req, res) => {
  try {
    const result = await model.booking_order_detail_extra.findAll({
      include: {
        model: model.price_items,
        as: 'boex_prit',
      },
    });

    res.status(200).json({
      message: 'Berhasil menampilkan data booking orders detail extra',
      data: result,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getBookingOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await model.booking_orders.findOne({
      // include: {
      //   model: model.booking_order_detail,
      //   as: 'booking_order_details',
      //   include: [
      //     {
      //       model: model.booking_order_detail_extra,
      //       as: 'booking_order_detail_extras',
      //       include: {
      //         model: model.price_items,
      //         as: 'boex_prit',
      //         // attributes: ['prit_name', 'prit_price'],
      //       },
      //     },
      //     {
      //       model: model.special_offer_coupons,
      //       as: 'special_offer_coupons',
      //       include: {
      //         model: model.special_offers,
      //         as: 'soco_spof',
      //       },
      //     },
      //   ],
      // },
      where: {
        boor_id: +id,
      },
    });

    const bordeBoex = await model.booking_order_detail.findAll({
      include: [
        {
          model: model.booking_order_detail_extra,
          as: 'booking_order_detail_extras',
          include: {
            model: model.price_items,
            as: 'boex_prit',
          },
        },
        {
          model: model.special_offer_coupons,
          as: 'special_offer_coupons',
          include: {
            model: model.special_offers,
            as: 'soco_spof',
          },
        },
        {
          model: model.facilities,
          as: 'facilities',
        },
      ],
      where: {
        borde_boor_id: +id,
      },
    });

    result === null
      ? res.status(404).json({
          message: `Data booking dengan id ${id} tidak ditemukan`,
        })
      : res.status(200).json({
          message: 'Berhasil menampilkan data booking',
          data: { boor: result, borde: bordeBoex },
        });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createBookingOrder = async (req, res) => {
  try {
    // boor_arrival_date, boor_total_room, boor_total_guest, boor_discount,
    const {
      //   boor_order_number,
      //   boor_order_date,
      //   boor_arrival_date,
      boor_total_room,
      boor_total_guest,
      boor_discount,
      boor_total_tax,
      boor_total_amount,
      boor_down_payment,
      boor_pay_type,
      boor_is_paid,
      boor_type,
      boor_cardnumber,
      boor_member_type,
      boor_status,
      boor_user_id,
      boor_hotel_id,
    } = req.body.booking_order;

    const insertBookingOrder = await model.booking_orders.create({
      //   boor_order_number,
      boor_order_date: new Date(),
      //   boor_arrival_date,
      //   boor_total_room,
      //   boor_total_guest,
      //   boor_discount,
      //   boor_total_tax,
      //   boor_total_amount,
      //   boor_down_payment,
      boor_pay_type,
      boor_is_paid,
      boor_type,
      boor_cardnumber,
      boor_member_type,
      boor_status: 'BOOKING',
      boor_user_id,
      boor_hotel_id,
    });

    // update booking number
    let date = new Date();
    let bodate = `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}`;

    let customBoorId = insertBookingOrder.boor_id;
    if (insertBookingOrder.boor_id.length == 1) {
      customBoorId = `00${insertBookingOrder}`;
    }

    if (insertBookingOrder.boor_id.length == 2) {
      customBoorId = `0${insertBookingOrder}`;
    }

    const boor_order_number = `BO-${bodate}-${customBoorId}`;

    const updateBookingOrderNumber = await model.booking_orders.update(
      {
        boor_order_number: boor_order_number,
      },
      {
        where: {
          boor_id: insertBookingOrder.boor_id,
        },
      }
    );

    // insert booking order detail
    const {
      borde_checkin,
      borde_checkout,
      borde_adults,
      borde_kids,
      borde_price,
      borde_extra,
      borde_discount,
      borde_tax,
      borde_subtotal,
      borde_faci_id,
      borde_tax_persen,
    } = req.body.booking_order_detail;

    let totalGuest = 0;
    let totalBoorTax = 0;
    let totalBoorAmount = 0;
    let totalBoorPaymentAmountWithTax = 0;

    req.body.booking_order_detail.map(async (item, index) => {
      // const taxPersen = 10;
      const taxPersen = item.borde_tax_persen ? item.borde_tax_persen : 10;

      const borderDetailSubTotal =
        +item.borde_price + +item.borde_extra - +item.borde_discount;

      totalGuest += +item.borde_kids + +item.borde_adults;
      const totalVacantBreakfast = +item.borde_kids + +item.borde_adults;

      const bordeTax = (borderDetailSubTotal * taxPersen) / 100;

      totalBoorTax += bordeTax;
      totalBoorAmount += borderDetailSubTotal;
      totalBoorPaymentAmountWithTax += borderDetailSubTotal + bordeTax;

      const insertBookingDetail = await model.booking_order_detail.create({
        borde_faci_id: item.borde_faci_id,
        borde_boor_id: insertBookingOrder.boor_id,
        borde_checkin: item.borde_checkin,
        borde_checkout: item.borde_checkout,
        borde_adults: item.borde_adults,
        borde_kids: item.borde_kids,
        borde_price: item.borde_price,
        borde_extra: item.borde_extra,
        borde_discount: item.borde_discount,
        borde_tax: bordeTax,
        // borde_subtotal: item.borde_subtotal,
        borde_subtotal: borderDetailSubTotal,
        borde_subtotal_with_tax: borderDetailSubTotal + bordeTax,
      });

      //insert user_breakfast
      const insertUserBreakfast = await model.user_breakfast.create({
        usbr_borde_id: insertBookingDetail.borde_id,
        usbr_total_vacant: totalVacantBreakfast,
      });
    });

    // insert discount =================================
    // const {soco_borde_id, soco_spof_id} =

    // update booking orders by booking detail information
    const updateBookingOrderByBookingDetail = await model.booking_orders.update(
      {
        boor_total_room: req.body.booking_order_detail.length,
        boor_total_guest: totalGuest,
        boor_total_tax: totalBoorTax,
        boor_total_amount: totalBoorAmount,
        boor_payment_amount: totalBoorPaymentAmountWithTax,
      },
      {
        where: {
          boor_id: insertBookingOrder.boor_id,
        },
      }
    );

    //   result ===============================

    // result created booking order
    const insertedBookingOrder = await model.booking_orders.findOne({
      where: {
        boor_id: insertBookingOrder.boor_id,
      },
    });

    // result created booking detail
    const insertedBookingDetail = await model.booking_order_detail.findAll({
      where: {
        borde_boor_id: insertBookingOrder.boor_id,
      },
    });

    res.status(200).json({
      message: 'Berhasil menambah data booking',
      data: {
        booking_order: insertedBookingOrder,
        booking_order_detail: insertedBookingDetail,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createBookingOrderDetailExtra = async (req, res) => {
  try {
    const {
      boex_price,
      boex_qty,
      boex_measure_unit,
      boex_borde_id,
      boex_prit_id,
    } = req.body;

    const borde = await model.booking_order_detail.findOne({
      where: {
        borde_id: boex_borde_id,
      },
    });

    if (!borde) {
      return res.status(404).json({
        message: `Data booking order dengan id ${boex_borde_id} tidak ditemukan`,
      });
    }

    const result = await model.booking_order_detail_extra.create(
      {
        boex_borde_id,
        boex_prit_id,
        boex_price,
        boex_qty,
        boex_subtotal: +boex_price * +boex_qty,
        boex_measure_unit,
      },
      {
        returning: true,
      }
    );

    //update borde_subtotal ===============================

    // calculate tax
    // get tax
    // const faciByBorde = await model.facilities.findOne({
    //   where: {
    //     borde_id: boex_borde_id,
    //   },
    // });
    const faciByBorde = await model.facilities.findOne({
      where: {
        faci_id: borde.borde_faci_id,
      },
    });

    const taxPersen = faciByBorde ? faciByBorde.faci_tax_rate : 10;
    let currentBordeSubTotal =
      borde.borde_price + borde.borde_extra - borde.borde_discount;
    const newBordeSubTotalNoTax =
      +borde.borde_price +
      +borde.borde_extra -
      +borde.borde_discount +
      +result.boex_subtotal;
    const newBordeTax = (newBordeSubTotalNoTax * taxPersen) / 100;
    const newBordeSubTotalWithTax = +newBordeSubTotalNoTax + +newBordeTax;

    // update db borde
    const updateBorde = await model.booking_order_detail.update(
      {
        borde_extra: +borde.borde_extra + +result.boex_subtotal,
        borde_tax: newBordeTax,
        borde_subtotal: Math.round(+newBordeSubTotalNoTax * 100) / 100,
        borde_subtotal_with_tax:
          Math.round(+newBordeSubTotalWithTax * 100) / 100,
      },
      {
        where: {
          borde_id: boex_borde_id,
        },
      }
    );

    // update boor subtotal ===============================

    // get all borde
    const boorData = await model.booking_order_detail.findAll({
      where: {
        borde_boor_id: borde.borde_boor_id,
      },
    });

    let totalBoorTax = 0;
    let totalBoorAmount = 0;
    let totalBoorPaymentAmountWithTax = 0;
    boorData.map((item) => {
      totalBoorTax += +item.borde_tax;
      totalBoorAmount += +item.borde_subtotal;
      totalBoorPaymentAmountWithTax += +item.borde_subtotal_with_tax;
    });

    const updateBoorTax = await model.booking_orders.update(
      {
        boor_total_tax: totalBoorTax,
        boor_total_amount: totalBoorAmount,
        boor_payment_amount: totalBoorPaymentAmountWithTax,
      },
      {
        where: {
          boor_id: borde.borde_boor_id,
        },
      }
    );

    res.status(200).json({
      message: 'Berhasil menambah item extra',
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteBookingOrderDetailExtra = async (req, res) => {
  try {
    const bookingExtraId = req.params.boexId;

    const boex = await model.booking_order_detail_extra.findOne({
      where: {
        boex_id: +bookingExtraId,
      },
    });

    if (!boex) {
      return res.status(404).json({
        message: `Data booking order extra dengan id ${bookingExtraId} tidak ditemukan`,
      });
    }

    const borde = await model.booking_order_detail.findOne({
      where: {
        borde_id: boex.boex_borde_id,
      },
    });

    if (!borde) {
      return res.status(404).json({
        message: `Data booking order dengan id ${boex_borde_id} tidak ditemukan`,
      });
    }

    //update borde_subtotal ===============================

    // calculate tax
    // get tax
    // const faciByBorde = await model.facilities.findOne({
    //   where: {
    //     borde_id: boex.boex_borde_id,
    //   },
    // });
    const faciByBorde = await model.facilities.findOne({
      where: {
        faci_id: borde.borde_faci_id,
      },
    });

    // const taxPersen = 10;
    const taxPersen = faciByBorde ? faciByBorde.faci_tax_rate : 10;
    let currentBordeSubTotal =
      +borde.borde_price + borde.borde_extra - +borde.borde_discount;
    const newBordeSubTotalNoTax =
      +borde.borde_price +
      +borde.borde_extra -
      +borde.borde_discount -
      +boex.boex_subtotal;
    const newBordeTax = (newBordeSubTotalNoTax * taxPersen) / 100;
    const newBordeSubTotalWithTax = newBordeSubTotalNoTax + newBordeTax;

    // update db borde
    const updateBorde = await model.booking_order_detail.update(
      {
        borde_extra: +borde.borde_extra + +result.boex_subtotal,
        borde_tax: newBordeTax,
        borde_subtotal: Math.round(+newBordeSubTotalNoTax * 100) / 100,
        borde_subtotal_with_tax:
          Math.round(+newBordeSubTotalWithTax * 100) / 100,
      },
      {
        where: {
          borde_id: boex.boex_borde_id,
        },
      }
    );

    // update boor subtotal ===============================

    // get all borde
    const boorData = await model.booking_order_detail.findAll({
      where: {
        borde_boor_id: borde.borde_boor_id,
      },
    });

    let totalBoorTax = 0;
    let totalBoorAmount = 0;
    let totalBoorPaymentAmountWithTax = 0;
    boorData.map((item) => {
      totalBoorTax += +item.borde_tax;
      totalBoorAmount += +item.borde_subtotal;
      totalBoorPaymentAmountWithTax += +item.borde_subtotal_with_tax;
    });

    const updateBoorTax = await model.booking_orders.update(
      {
        boor_total_tax: totalBoorTax,
        boor_total_amount: totalBoorAmount,
        boor_payment_amount: totalBoorPaymentAmountWithTax,
      },
      {
        where: {
          boor_id: borde.borde_boor_id,
        },
      }
    );

    // delete boex
    const destroyBoex = await model.booking_order_detail_extra.destroy({
      where: {
        boex_id: +bookingExtraId,
      },
    });

    res.status(200).json({
      message: 'Berhasil menghapus item extra',
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const applyDiscount = async (req, res) => {
  try {
    const { spof_name, soco_borde_id, soco_spof_id } = req.body;
    const spofName = spof_name;

    const borde = await model.booking_order_detail.findOne({
      where: {
        borde_id: soco_borde_id,
      },
    });

    if (!borde) {
      return res.status(404).json({
        message: `Data booking order dengan id ${soco_borde_id} tidak ditemukan`,
      });
    }

    if (+borde.borde_subtotal == 0) {
      return res.status(400).json({
        message: `Kupon tidak dapat diterapkan karena total pembayaran anda untuk data ini sudah 0`,
      });
    }

    const spof = await model.special_offers.findOne({
      where: {
        spof_id: soco_spof_id,
      },
    });

    if (!spof) {
      return res.status(404).json({
        message: `Data dengan id ${soco_spof_id} tidak ditemukan`,
      });
    }

    // ================== check applied discount
    const appliedCoupon = await model.special_offer_coupons.findOne({
      where: {
        soco_spof_id: spof.spof_id,
        soco_borde_id: borde.borde_id,
      },
    });

    if (appliedCoupon) {
      return res.status(400).json({
        message: `Kupon diskon dengan kode ${spof.spof_name} sudah anda pakai`,
      });
    }

    const date = new Date();
    const end = new Date(spof.spof_end_date);
    const start = new Date(spof.spof_start_date);

    // check date
    if (date > end) {
      return res.status(400).json({
        message: `Kupon diskon dengan kode ${spof.spof_name} sudah kadaluarsa`,
      });
    }
    if (date < start) {
      return res.status(400).json({
        message: `Kupon diskon dengan kode ${spof.spof_name} tidak ditemukan`,
      });
    }

    // check qty
    if (spof.spof_max_qty < 1) {
      return res.status(400).json({
        message: `Kupon diskon dengan kode ${spof.spof_name} sudah habis`,
      });
    }

    // ================== add discount
    const insertDiscount = await model.special_offer_coupons.create({
      soco_borde_id: soco_borde_id,
      soco_spof_id: soco_spof_id,
    });

    // ================== update borde

    // calculate tax
    // get tax
    const faciByBorde = await model.facilities.findOne({
      where: {
        faci_id: borde.borde_faci_id,
      },
    });

    // const taxPersen = 10;
    const taxPersen = faciByBorde ? faciByBorde.faci_tax_rate : 10;

    let currentBordeSubTotal = +borde.borde_subtotal;
    let newBordeSubTotalNoTax = currentBordeSubTotal - spof.spof_discount;
    if (newBordeSubTotalNoTax < 0) {
      newBordeSubTotalNoTax = 0;
    }
    const newBordeTax = (newBordeSubTotalNoTax * taxPersen) / 100;
    const newBordeSubTotalWithTax = newBordeSubTotalNoTax + newBordeTax;

    let bordeDiscount = +borde.borde_discount + +spof.spof_discount;
    if (newBordeSubTotalNoTax === 0) {
      bordeDiscount = borde.borde_price + borde.borde_extra;
    }

    // update db borde
    const updateBorde = await model.booking_order_detail.update(
      {
        borde_discount: bordeDiscount,
        borde_tax: newBordeTax,
        borde_subtotal: Math.round(+newBordeSubTotalNoTax * 100) / 100,
        borde_subtotal_with_tax:
          Math.round(+newBordeSubTotalWithTax * 100) / 100,
      },
      {
        where: {
          borde_id: soco_borde_id,
        },
      }
    );

    // update boor subtotal ===============================

    // get all borde
    const boorData = await model.booking_order_detail.findAll({
      where: {
        borde_boor_id: borde.borde_boor_id,
      },
    });

    let totalBoorTax = 0;
    let totalBoorAmount = 0;
    let totalBoorPaymentAmountWithTax = 0;
    let totalBoorDiscount = 0;
    boorData.map((item) => {
      totalBoorTax += +item.borde_tax;
      totalBoorAmount += +item.borde_subtotal;
      totalBoorPaymentAmountWithTax += +item.borde_subtotal_with_tax;
      totalBoorDiscount += +item.borde_discount;
    });

    const updateBoorTax = await model.booking_orders.update(
      {
        boor_total_tax: totalBoorTax,
        boor_total_amount: totalBoorAmount,
        boor_payment_amount: totalBoorPaymentAmountWithTax,
        boor_discount: totalBoorDiscount,
      },
      {
        where: {
          boor_id: borde.borde_boor_id,
        },
      }
    );

    // update discount stock
    const updateSpofCount = await model.special_offers.update(
      {
        spof_max_qty: spof.spof_max_qty - 1,
      },
      {
        where: {
          spof_id: soco_spof_id,
        },
      }
    );

    res.status(200).json({
      message: 'Berhasil menambahkan diskon',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const getAllHotel = async (req, res) => {
  try {
    const result = await model.hotels.findAll({
      include: [
        {
          model: model.facilities,
          as: 'facilities',
          include: {
            model: model.facility_photos,
            as: 'facility_photos',
            // required: true,
          },
        },
        {
          model: model.address,
          as: 'hotel_addr',
        },
      ],
    });

    res.status(200).json({
      message: 'Berhasil menampilkan data hotel',
      data: result,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllHotelById = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await model.hotels.findOne({
      include: [
        {
          model: model.facilities,
          as: 'facilities',
          include: {
            model: model.facility_photos,
            as: 'facility_photos',
            // required: true,
          },
        },
        {
          model: model.hotel_reviews,
          as: 'hotel_reviews',
        },
        {
          model: model.address,
          as: 'hotel_addr',
        },
      ],
      where: {
        hotel_id: id,
      },
    });

    result === null
      ? res.status(404).json({
          message: `Data hotel dengan id ${id} tidak ditemukan`,
        })
      : res.status(200).json({
          message: 'Berhasil menampilkan data hotel',
          data: result,
        });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateBookingOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      boor_arrival_date,
      boor_down_payment,
      boor_pay_type,
      boor_is_paid,
      boor_type,
      boor_cardnumber,
      boor_member_type,
      boor_status,
    } = req.body;

    const updateBoor = await model.booking_orders.update(
      {
        boor_arrival_date,
        boor_down_payment,
        boor_pay_type,
        boor_is_paid,
        boor_type,
        boor_cardnumber,
        boor_member_type,
        boor_status,
      },
      {
        where: {
          boor_id: id,
        },
        returning: true,
      }
    );

    res.status(200).json({
      message: 'Berhasil mengubah data booking order',
      data: updateBoor[1][0],
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllPriceItems = async (req, res) => {
  try {
    const result = await model.price_items.findAll();

    res.status(200).json({
      message: 'Berhasil menampilkan data extra items',
      data: result,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
