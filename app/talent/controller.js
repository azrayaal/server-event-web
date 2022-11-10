const Talent = require('./model');
const path = require('path');
const fs = require('fs');
const config = require('../../config');

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };
      const talent = await Talent.find();

      console.log('alert >>');
      console.log(alert);

      res.render('admin/talent/view_talent', {
        talent,
        alert,
        // name: req.session.user.name,
        title: 'Halaman kategori',
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/talent');
    }
  },

  viewCreate: async (req, res) => {
    try {
      res.render('admin/talent/create', {
        // name: req.session.user.name,
        title: 'Halaman tambah kategori',
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/talent');
    }
  },

  actionCreate: async (req, res) => {
    try {
      const { talent_name } = req.body;

      if (req.file) {
        let tmp_path = req.file.path;
        let originaExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
        let filename = req.file.filename + '.' + originaExt;
        let target_path = path.resolve(config.rootPath, `public/uploads/${filename}`);

        const src = fs.createReadStream(tmp_path);
        const dest = fs.createWriteStream(target_path);

        src.pipe(dest);

        src.on('end', async () => {
          try {
            const talent = new Talent({
              talent_name,
              talent_picture: filename,
            });

            await talent.save();

            req.flash('alertMessage', 'Berhasil tambah talent');
            req.flash('alertStatus', 'success');

            res.redirect('/talent');
          } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/talent');
          }
        });
      } else {
        const talent = new Talent({
          talent_name,
        });

        await talent.save();

        req.flash('alertMessage', 'Berhasil tambah talent');
        req.flash('alertStatus', 'success');
        res.redirect('/talent');
      }
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/talent');
    }
  },

  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;

      const talent = await Talent.findOne({ _id: id });

      res.render('admin/talent/edit', {
        talent,
        // name: req.session.user.name,
        title: 'Halaman ubah kategori',
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/talent');
    }
  },

  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { talent_name, talent_picture } = req.body;

      if (req.file) {
        let tmp_path = req.file.path;
        let originaExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
        let filename = req.file.filename + '.' + originaExt;
        let target_path = path.resolve(config.rootPath, `public/uploads/${filename}`);

        const src = fs.createReadStream(tmp_path);
        const dest = fs.createWriteStream(target_path);

        src.pipe(dest);

        src.on('end', async () => {
          try {
            const talent = await Talent.findOne({ _id: id });

            let currentImage = `${config.rootPath}/public/uploads/${talent.talent_picture}`;
            if (fs.existsSync(currentImage)) {
              fs.unlinkSync(currentImage);
            }

            await Talent.findOneAndUpdate(
              {
                _id: id,
              },
              {
                talent_name,
                talent_picture: filename,
              }
            );

            req.flash('alertMessage', 'Berhasil ubah talent');
            req.flash('alertStatus', 'success');

            res.redirect('/talent');
          } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/talent');
          }
        });
      } else {
        await Talent.findOneAndUpdate(
          {
            _id: id,
          },
          {
            talent_name,
          }
        );

        req.flash('alertMessage', 'Berhasil ubah Talent');
        req.flash('alertStatus', 'success');

        res.redirect('/talent');
      }
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/talent');
    }
  },

  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;

      await Talent.findOneAndRemove({
        _id: id,
      });

      req.flash('alertMessage', 'Berhasil hapus kategori');
      req.flash('alertStatus', 'success');

      res.redirect('/talent');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/talent');
    }
  },
};
